import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { usePermissions } from "@/hooks/usePermissions";
import { useHydration } from "@/hooks/useHydration";
import { Permission } from "@/lib/permissions";

interface RouteGuardProps {
  children: React.ReactNode;
  permission?: Permission | string;
  permissions?: (Permission | string)[];
  requireAll?: boolean;
  redirectTo?: string;
  role?: string;
  roleLevel?: string;
  loading?: React.ReactNode;
}

/**
 * RouteGuard component for page-level protection
 * Redirects unauthorized users to login or specified page
 *
 * Usage examples:
 * <RouteGuard permission="users.view">
 *   <UsersPage />
 * </RouteGuard>
 *
 * <RouteGuard permissions={["products.view", "products.edit"]} requireAll>
 *   <ProductManagementPage />
 * </RouteGuard>
 *
 * <RouteGuard role="admin" redirectTo="/dashboard">
 *   <AdminPanel />
 * </RouteGuard>
 */
export default function RouteGuard({
  children,
  permission,
  permissions,
  requireAll = false,
  redirectTo = "/login",
  role,
  roleLevel,
  loading = null,
}: RouteGuardProps) {
  const router = useRouter();
  const isHydrated = useHydration();
  const [hasChecked, setHasChecked] = useState(false);
  const {
    hasPermission,
    hasAnyPermission,
    hasAllPermissions,
    hasRole,
    hasRoleLevel,
    isAuthenticated,
    isLoading,
  } = usePermissions();

  useEffect(() => {
    // Wait for hydration and auth loading to complete
    if (!isHydrated || isLoading) {
      return;
    }

    // Add minimal delay to prevent race conditions on refresh
    const timer = setTimeout(() => {
      setHasChecked(true);

      // Check authentication first
      if (!isAuthenticated()) {
        router.push(redirectTo);
        return;
      }

      // Check role-based access
      if (role && !hasRole(role)) {
        router.push("/dashboard"); // Redirect to dashboard instead of login for authenticated users
        return;
      }

      if (roleLevel && !hasRoleLevel(roleLevel)) {
        router.push("/dashboard");
        return;
      }

      // Check single permission
      if (permission && !hasPermission(permission)) {
        router.push("/dashboard");
        return;
      }

      // Check multiple permissions
      if (permissions) {
        const hasAccess = requireAll
          ? hasAllPermissions(permissions)
          : hasAnyPermission(permissions);

        if (!hasAccess) {
          router.push("/dashboard");
          return;
        }
      }
    }, 50); // Reduced to 50ms for faster redirect

    return () => clearTimeout(timer);
  }, [
    permission,
    permissions,
    requireAll,
    role,
    roleLevel,
    redirectTo,
    router,
    hasPermission,
    hasAnyPermission,
    hasAllPermissions,
    hasRole,
    hasRoleLevel,
    isAuthenticated,
    isLoading,
    isHydrated,
  ]);

  // Show loading while checking permissions, loading auth state, or waiting for checks
  if (!isHydrated || isLoading || !hasChecked) {
    return <>{loading}</>;
  }

  // If not authenticated after checks, show loading (will be redirected by useEffect)
  if (!isAuthenticated()) {
    return <>{loading}</>;
  }

  // Check access before rendering
  let hasAccess = true;

  if (role && !hasRole(role)) {
    hasAccess = false;
  }

  if (roleLevel && !hasRoleLevel(roleLevel)) {
    hasAccess = false;
  }

  if (permission && !hasPermission(permission)) {
    hasAccess = false;
  }

  if (permissions) {
    const accessCheck = requireAll
      ? hasAllPermissions(permissions)
      : hasAnyPermission(permissions);

    if (!accessCheck) {
      hasAccess = false;
    }
  }

  if (!hasAccess) {
    return <>{loading}</>;
  }

  return <>{children}</>;
}

/**
 * Specialized route guards for common use cases
 */

export function AdminRoute({
  children,
  loading,
}: {
  children: React.ReactNode;
  loading?: React.ReactNode;
}) {
  return (
    <RouteGuard role="admin" loading={loading}>
      {children}
    </RouteGuard>
  );
}

export function ManagerRoute({
  children,
  loading,
}: {
  children: React.ReactNode;
  loading?: React.ReactNode;
}) {
  return (
    <RouteGuard roleLevel="manager" loading={loading}>
      {children}
    </RouteGuard>
  );
}

export function AuthenticatedRoute({
  children,
  redirectTo = "/login",
  loading,
}: {
  children: React.ReactNode;
  redirectTo?: string;
  loading?: React.ReactNode;
}) {
  return (
    <RouteGuard redirectTo={redirectTo} loading={loading}>
      {children}
    </RouteGuard>
  );
}
