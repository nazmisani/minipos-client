import React from "react";
import { usePermissions } from "@/hooks/usePermissions";
import { Permission } from "@/lib/permissions";

interface ProtectedProps {
  children: React.ReactNode;
  permission?: Permission | string;
  permissions?: (Permission | string)[];
  requireAll?: boolean;
  fallback?: React.ReactNode;
  role?: string;
  roleLevel?: string;
}

/**
 * Protected component for conditional rendering based on permissions
 *
 * Usage examples:
 * <Protected permission="users.create">
 *   <AddUserButton />
 * </Protected>
 *
 * <Protected permissions={["products.view", "products.edit"]} requireAll>
 *   <ProductForm />
 * </Protected>
 *
 * <Protected role="admin">
 *   <AdminPanel />
 * </Protected>
 */
export default function Protected({
  children,
  permission,
  permissions,
  requireAll = false,
  fallback = null,
  role,
  roleLevel,
}: ProtectedProps) {
  const {
    hasPermission,
    hasAnyPermission,
    hasAllPermissions,
    hasRole,
    hasRoleLevel,
    isAuthenticated,
  } = usePermissions();

  // Check authentication first
  if (!isAuthenticated()) {
    return <>{fallback}</>;
  }

  // Check role-based access
  if (role && !hasRole(role)) {
    return <>{fallback}</>;
  }

  if (roleLevel && !hasRoleLevel(roleLevel)) {
    return <>{fallback}</>;
  }

  // Check single permission
  if (permission && !hasPermission(permission)) {
    return <>{fallback}</>;
  }

  // Check multiple permissions
  if (permissions) {
    const hasAccess = requireAll
      ? hasAllPermissions(permissions)
      : hasAnyPermission(permissions);

    if (!hasAccess) {
      return <>{fallback}</>;
    }
  }

  return <>{children}</>;
}

/**
 * Specialized components for common use cases
 */

export function AdminOnly({
  children,
  fallback,
}: {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}) {
  return (
    <Protected role="admin" fallback={fallback}>
      {children}
    </Protected>
  );
}

export function ManagerOrAbove({
  children,
  fallback,
}: {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}) {
  return (
    <Protected roleLevel="manager" fallback={fallback}>
      {children}
    </Protected>
  );
}

export function AuthenticatedOnly({
  children,
  fallback,
}: {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}) {
  const { isAuthenticated } = usePermissions();

  if (!isAuthenticated()) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}
