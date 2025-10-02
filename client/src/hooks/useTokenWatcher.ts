import { useEffect, useCallback } from "react";
import { useAuth } from "@/contexts/authContext";

/**
 * Hook to watch for token changes and automatically refresh user context
 * This handles cases where token changes outside of the normal auth flow
 */
export function useTokenWatcher() {
  const { refreshUser } = useAuth();

  // Function to trigger auth change event across tabs
  const notifyAuthChange = useCallback(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("auth_changed", Date.now().toString());
      localStorage.removeItem("auth_changed");
    }
  }, []);

  // Watch for cookie changes using polling
  useEffect(() => {
    let lastToken: string | null = null;

    const checkTokenChange = () => {
      if (typeof document === "undefined") return;

      const getCurrentToken = () => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; token=`);
        return parts.length === 2
          ? parts.pop()?.split(";").shift() || null
          : null;
      };

      const currentToken = getCurrentToken();

      if (currentToken !== lastToken) {
        lastToken = currentToken;
        refreshUser();
        notifyAuthChange();
      }
    };

    // Initial check
    checkTokenChange();

    // Poll for changes every 2 seconds
    const interval = setInterval(checkTokenChange, 2000);

    return () => clearInterval(interval);
  }, [refreshUser, notifyAuthChange]);

  return { notifyAuthChange };
}

/**
 * Enhanced auth hook that includes token watching
 */
export function useAuthWithWatcher() {
  const auth = useAuth();
  const { notifyAuthChange } = useTokenWatcher();

  return {
    ...auth,
    notifyAuthChange,
  };
}
