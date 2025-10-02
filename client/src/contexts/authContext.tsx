// contexts/AuthContext.tsx
"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { TokenValidator, CookieManager } from "@/lib/tokenUtils";

type User = {
  id: number;
  email: string;
  role: "admin" | "manager" | "cashier";
};

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  refreshUser: () => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isHydrated, setIsHydrated] = useState(false);

  // Helper to validate and decode token using TokenValidator
  const validateAndDecodeToken = useCallback((token: string): User | null => {
    const validation = TokenValidator.validate(token);

    if (!validation.isValid) {
      console.warn("Token validation failed:", validation.error);
      return null;
    }

    return validation.user as User;
  }, []);

  // Function to refresh user from token
  const refreshUser = useCallback(() => {
    setIsLoading(true);
    const token = CookieManager.get("token");

    if (token) {
      const validUser = validateAndDecodeToken(token);
      setUser(validUser);
    } else {
      setUser(null);
    }

    setIsLoading(false);
  }, [validateAndDecodeToken]);

  // Function to logout
  const logout = useCallback(() => {
    // Clear cookie using CookieManager
    CookieManager.remove("token");

    // Clear user state
    setUser(null);

    // Notify other tabs about auth change
    if (typeof localStorage !== "undefined") {
      localStorage.setItem("auth_changed", Date.now().toString());
      localStorage.removeItem("auth_changed");
    }

    // Redirect to login if needed
    if (typeof window !== "undefined") {
      window.location.href = "/login";
    }
  }, []);

  // Initial load and hydration
  useEffect(() => {
    setIsHydrated(true);

    // Add small delay to ensure cookie is properly loaded after page refresh
    const timer = setTimeout(() => {
      refreshUser();
    }, 100);

    return () => clearTimeout(timer);
  }, [refreshUser]);

  // Token watcher - check for token changes periodically
  useEffect(() => {
    const interval = setInterval(() => {
      const currentToken = CookieManager.get("token");

      if (!currentToken && user) {
        // Token was removed but user still exists - force logout
        setUser(null);
      } else if (currentToken && !user && !isLoading) {
        // Token exists but no user - try to refresh
        refreshUser();
      }
    }, 5000); // Check every 5 seconds

    return () => clearInterval(interval);
  }, [user, refreshUser, isLoading]);

  // Storage event listener for cross-tab synchronization
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "auth_changed") {
        refreshUser();
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [refreshUser]);

  const contextValue = {
    user,
    isLoading,
    refreshUser,
    logout,
  };

  // Prevent hydration mismatch by not rendering protected content until hydrated
  if (!isHydrated) {
    return (
      <AuthContext.Provider
        value={{
          user: null,
          isLoading: true,
          refreshUser: () => {},
          logout: () => {},
        }}
      >
        {children}
      </AuthContext.Provider>
    );
  }

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};
