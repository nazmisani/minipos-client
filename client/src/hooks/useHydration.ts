import { useEffect, useState } from "react";

/**
 * Hook to detect when the component has hydrated on the client
 * Useful for preventing hydration mismatches with auth-dependent content
 */
export function useHydration() {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  return isHydrated;
}
