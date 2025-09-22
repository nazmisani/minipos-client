// Utility function to get auth headers
export function getAuthHeaders() {
  if (typeof window !== "undefined") {
    // Try to get from cookie first
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];

    // Or get from localStorage as fallback
    const localToken = localStorage.getItem("token");

    const authToken = token || localToken;

    if (authToken) {
      return {
        Authorization: `Bearer ${authToken}`,
      };
    }
  }
  return {};
}

// Alternative: Get token directly
export function getToken(): string | null {
  if (typeof window !== "undefined") {
    // Try cookie first
    const cookieToken = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];

    // Fallback to localStorage
    const localToken = localStorage.getItem("token");

    return cookieToken || localToken || null;
  }
  return null;
}
