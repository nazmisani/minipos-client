import { jwtDecode } from "jwt-decode";

export interface TokenValidationResult {
  isValid: boolean;
  user: any | null;
  error?: string;
  expiresIn?: number; // seconds until expiration
}

export interface DecodedToken {
  id: number;
  email: string;
  role: "admin" | "manager" | "cashier";
  exp?: number;
  iat?: number;
}

/**
 * Comprehensive token validation utility
 */
export class TokenValidator {
  /**
   * Validate a JWT token and return validation result
   */
  static validate(token: string): TokenValidationResult {
    if (!token || typeof token !== "string") {
      return {
        isValid: false,
        user: null,
        error: "Token is missing or invalid format",
      };
    }

    try {
      const decoded = jwtDecode(token) as DecodedToken;

      // Check token structure
      const structureValidation = this.validateTokenStructure(decoded);
      if (!structureValidation.isValid) {
        return structureValidation;
      }

      // Check expiration
      const expirationValidation = this.validateTokenExpiration(decoded);
      if (!expirationValidation.isValid) {
        return expirationValidation;
      }

      return {
        isValid: true,
        user: {
          id: decoded.id,
          email: decoded.email,
          role: decoded.role,
        },
        expiresIn: expirationValidation.expiresIn,
      };
    } catch (error) {
      return {
        isValid: false,
        user: null,
        error: `Token decode error: ${
          error instanceof Error ? error.message : "Unknown error"
        }`,
      };
    }
  }

  /**
   * Validate token structure and required fields
   */
  private static validateTokenStructure(decoded: any): TokenValidationResult {
    const requiredFields = ["id", "email", "role"];
    const missingFields = requiredFields.filter((field) => !decoded[field]);

    if (missingFields.length > 0) {
      return {
        isValid: false,
        user: null,
        error: `Token missing required fields: ${missingFields.join(", ")}`,
      };
    }

    // Validate role
    const validRoles = ["admin", "manager", "cashier"];
    if (!validRoles.includes(decoded.role)) {
      return {
        isValid: false,
        user: null,
        error: `Invalid role: ${decoded.role}`,
      };
    }

    return { isValid: true, user: null };
  }

  /**
   * Validate token expiration
   */
  private static validateTokenExpiration(
    decoded: DecodedToken
  ): TokenValidationResult & { expiresIn?: number } {
    if (!decoded.exp) {
      // Token without expiration - assume valid but warn
      console.warn("Token has no expiration date");
      return { isValid: true, user: null };
    }

    const currentTime = Math.floor(Date.now() / 1000);
    const expirationTime = decoded.exp;
    const expiresIn = expirationTime - currentTime;

    if (expiresIn <= 0) {
      return {
        isValid: false,
        user: null,
        error: "Token has expired",
      };
    }

    // Warn if token expires within 5 minutes
    if (expiresIn <= 300) {
      console.warn(`Token expires in ${expiresIn} seconds`);
    }

    return {
      isValid: true,
      user: null,
      expiresIn,
    };
  }

  /**
   * Check if token is close to expiration (within threshold)
   */
  static isCloseToExpiration(
    token: string,
    thresholdMinutes: number = 5
  ): boolean {
    const validation = this.validate(token);
    if (!validation.isValid || !validation.expiresIn) {
      return false;
    }

    return validation.expiresIn <= thresholdMinutes * 60;
  }

  /**
   * Get token expiration time as Date
   */
  static getExpirationDate(token: string): Date | null {
    try {
      const decoded = jwtDecode(token) as DecodedToken;
      return decoded.exp ? new Date(decoded.exp * 1000) : null;
    } catch {
      return null;
    }
  }

  /**
   * Extract user info from token without validation
   */
  static extractUser(token: string): any | null {
    try {
      const decoded = jwtDecode(token) as DecodedToken;
      return {
        id: decoded.id,
        email: decoded.email,
        role: decoded.role,
      };
    } catch {
      return null;
    }
  }
}

/**
 * Cookie management utilities
 */
export class CookieManager {
  /**
   * Get cookie value safely
   */
  static get(name: string): string | null {
    if (typeof document === "undefined") return null;

    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);

    if (parts.length === 2) {
      const cookieValue = parts.pop()?.split(";").shift();
      return cookieValue || null;
    }

    return null;
  }

  /**
   * Set cookie with options
   */
  static set(
    name: string,
    value: string,
    options: {
      expires?: Date;
      maxAge?: number;
      path?: string;
      domain?: string;
      secure?: boolean;
      httpOnly?: boolean;
      sameSite?: "strict" | "lax" | "none";
    } = {}
  ): void {
    if (typeof document === "undefined") return;

    let cookieString = `${name}=${value}`;

    if (options.expires) {
      cookieString += `; expires=${options.expires.toUTCString()}`;
    }

    if (options.maxAge) {
      cookieString += `; max-age=${options.maxAge}`;
    }

    if (options.path) {
      cookieString += `; path=${options.path}`;
    } else {
      cookieString += `; path=/`;
    }

    if (options.domain) {
      cookieString += `; domain=${options.domain}`;
    }

    if (options.secure) {
      cookieString += `; secure`;
    }

    if (options.sameSite) {
      cookieString += `; samesite=${options.sameSite}`;
    }

    document.cookie = cookieString;
  }

  /**
   * Remove cookie
   */
  static remove(name: string, path: string = "/"): void {
    if (typeof document === "undefined") return;

    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=${path};`;
  }

  /**
   * Check if cookie exists
   */
  static exists(name: string): boolean {
    return this.get(name) !== null;
  }
}
