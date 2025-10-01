import React from "react";
import { useAuth } from "@/contexts/authContext";
import {
  PERMISSIONS,
  Permission,
  Role,
  hasRoleHierarchy,
  isValidPermission,
} from "@/lib/permissions";

/**
 * Advanced permissions hook that provides comprehensive RBAC functionality
 * Built on top of existing authContext - no breaking changes!
 */
export function usePermissions() {
  const { user } = useAuth();

  /**
   * Check if user has a specific permission
   */
  const hasPermission = (permission: Permission | string): boolean => {
    if (!user) return false;

    if (!isValidPermission(permission)) {
      console.warn(`Invalid permission: ${permission}`);
      return false;
    }

    const allowedRoles = PERMISSIONS[permission as Permission];
    return allowedRoles ? allowedRoles.includes(user.role as any) : false;
  };

  /**
   * Check if user has ANY of the provided permissions
   */
  const hasAnyPermission = (permissions: (Permission | string)[]): boolean => {
    return permissions.some((permission) => hasPermission(permission));
  };

  /**
   * Check if user has ALL of the provided permissions
   */
  const hasAllPermissions = (permissions: (Permission | string)[]): boolean => {
    return permissions.every((permission) => hasPermission(permission));
  };

  /**
   * Check if user has a specific role
   */
  const hasRole = (role: Role | string): boolean => {
    if (!user) return false;
    return user.role === role;
  };

  /**
   * Check if user has role hierarchy level (admin > manager > cashier)
   */
  const hasRoleLevel = (requiredRole: Role | string): boolean => {
    if (!user) return false;
    return hasRoleHierarchy(user.role, requiredRole);
  };

  /**
   * Get current user role
   */
  const getCurrentRole = (): Role | null => {
    return (user?.role as Role) || null;
  };

  /**
   * Check if user is authenticated
   */
  const isAuthenticated = (): boolean => {
    return !!user;
  };

  /**
   * Check if user is admin
   */
  const isAdmin = (): boolean => {
    return hasRole("admin");
  };

  /**
   * Check if user is manager or above
   */
  const isManagerOrAbove = (): boolean => {
    return hasRoleLevel("manager");
  };

  /**
   * Get user info (safe access)
   */
  const getUserInfo = () => {
    return user
      ? {
          id: user.id,
          email: user.email,
          role: user.role,
        }
      : null;
  };

  /**
   * Utility for conditional rendering based on permissions
   */
  const can = (permission: Permission | string) => ({
    view: hasPermission(permission),
    render: (component: React.ReactNode) =>
      hasPermission(permission) ? component : null,
  });

  return {
    // Core permission checks
    hasPermission,
    hasAnyPermission,
    hasAllPermissions,

    // Role-based checks
    hasRole,
    hasRoleLevel,
    getCurrentRole,

    // Authentication checks
    isAuthenticated,
    isAdmin,
    isManagerOrAbove,

    // User info
    user: getUserInfo(),

    // Utility methods
    can,
  };
}

/**
 * Higher-order component for permission-based rendering
 * Usage: withPermissions(['users.create'])(MyComponent)
 */
export function withPermissions(requiredPermissions: (Permission | string)[]) {
  return function <T extends object>(Component: React.ComponentType<T>) {
    return function PermissionWrappedComponent(props: T) {
      const { hasAllPermissions } = usePermissions();

      if (!hasAllPermissions(requiredPermissions)) {
        return null;
      }

      return React.createElement(Component, props);
    };
  };
}

/**
 * Hook for protecting routes with permissions
 */
export function useRouteProtection() {
  const { hasPermission, isAuthenticated } = usePermissions();

  const requireAuth = (): boolean => {
    return isAuthenticated();
  };

  const requirePermission = (permission: Permission | string): boolean => {
    return hasPermission(permission);
  };

  const requireAnyPermission = (
    permissions: (Permission | string)[]
  ): boolean => {
    const { hasAnyPermission } = usePermissions();
    return hasAnyPermission(permissions);
  };

  return {
    requireAuth,
    requirePermission,
    requireAnyPermission,
  };
}
