// Export all auth-related components for easy importing
export {
  default as Protected,
  AdminOnly,
  ManagerOrAbove,
  AuthenticatedOnly,
} from "./Protected";
export {
  default as RouteGuard,
  AdminRoute,
  ManagerRoute,
  AuthenticatedRoute,
} from "./RouteGuard";

// Re-export from hooks for convenience
export {
  usePermissions,
  useRouteProtection,
  withPermissions,
} from "@/hooks/usePermissions";

// Re-export types
export type { Permission, Role } from "@/lib/permissions";
