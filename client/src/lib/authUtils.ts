import { CookieManager, TokenValidator } from "./tokenUtils";

/**
 * Enhanced authentication utilities for improved login/logout flow
 */
export class AuthUtils {
  /**
   * Enhanced login function that handles token setting and context refresh
   */
  static async login(
    token: string,
    rememberMe: boolean = false
  ): Promise<void> {
    // Calculate expiration time
    const maxAge = rememberMe ? 30 * 24 * 60 * 60 : 7 * 24 * 60 * 60; // 30 days or 7 days

    // CRITICAL FIX: For cross-domain, use sameSite=none with secure
    const isProduction =
      process.env.NODE_ENV === "production" ||
      (typeof window !== "undefined" && window.location.protocol === "https:");

    // Set cookie with appropriate options for cross-domain
    CookieManager.set("token", token, {
      maxAge,
      path: "/",
      secure: isProduction,
      sameSite: isProduction ? "none" : "lax",
    });

    // Notify all tabs about auth change
    this.notifyAuthChange();

    // Small delay to ensure cookie is set before redirect
    await new Promise((resolve) => setTimeout(resolve, 100));
  }

  /**
   * Enhanced logout function with complete cleanup
   */
  static logout(): void {
    // Clear all auth-related cookies
    CookieManager.remove("token");

    // Clear any auth-related localStorage items
    if (typeof localStorage !== "undefined") {
      localStorage.removeItem("user");
      localStorage.removeItem("authState");
    }

    // Clear any auth-related sessionStorage items
    if (typeof sessionStorage !== "undefined") {
      sessionStorage.removeItem("tempAuthData");
    }

    // Notify all tabs about logout
    this.notifyAuthChange();

    // Force redirect to login
    this.redirectToLogin();
  }

  /**
   * Force refresh of authentication context across all tabs
   */
  static forceRefresh(): void {
    this.notifyAuthChange();
  }

  /**
   * Check if user is currently authenticated
   */
  static isAuthenticated(): boolean {
    const token = CookieManager.get("token");
    return !!token;
  }

  /**
   * Get current user from token without context
   */
  static getCurrentUser(): unknown | null {
    const token = CookieManager.get("token");
    if (!token) return null;

    try {
      const validation = TokenValidator.validate(token);
      return validation.isValid ? validation.user : null;
    } catch {
      return null;
    }
  }

  /**
   * Redirect to login page
   */
  private static redirectToLogin(): void {
    if (typeof window !== "undefined") {
      const currentPath = window.location.pathname;
      const redirectUrl =
        currentPath !== "/login"
          ? `?redirect=${encodeURIComponent(currentPath)}`
          : "";
      window.location.href = `/login${redirectUrl}`;
    }
  }

  /**
   * Notify all tabs about authentication changes
   */
  private static notifyAuthChange(): void {
    if (typeof localStorage !== "undefined") {
      // Use localStorage event to notify other tabs
      localStorage.setItem("auth_changed", Date.now().toString());
      localStorage.removeItem("auth_changed");
    }
  }

  /**
   * Setup cross-tab auth synchronization
   */
  static setupCrossTabSync(onAuthChange: () => void): () => void {
    if (typeof window === "undefined") {
      return () => {};
    }

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "auth_changed") {
        onAuthChange();
      }
    };

    window.addEventListener("storage", handleStorageChange);

    // Return cleanup function
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }

  /**
   * Check if token is close to expiration and needs refresh
   */
  static needsRefresh(minutesThreshold: number = 5): boolean {
    const token = CookieManager.get("token");
    if (!token) return false;

    try {
      return TokenValidator.isCloseToExpiration(token, minutesThreshold);
    } catch {
      return false;
    }
  }

  /**
   * Auto-refresh token if needed (placeholder for future implementation)
   */
  static async autoRefreshIfNeeded(): Promise<boolean> {
    // This would typically call your refresh token endpoint
    // For now, just check if refresh is needed
    return this.needsRefresh();
  }
}
