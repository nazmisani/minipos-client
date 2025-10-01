/**
 * RBAC Permission System - Aligned with Backend API
 *
 * Permission naming convention: [resource].[action]
 * Actions: view, create, edit, delete
 * Resources: auth, users, products, categories, transactions, customers, settings
 */

export const PERMISSIONS = {
  // Auth - All authenticated users
  "auth.profile": ["admin", "manager", "cashier"],

  // Users Management - Admin only
  "users.view": ["admin"],
  "users.create": ["admin"],
  "users.edit": ["admin"],
  "users.delete": ["admin"],

  // Products Management
  "products.view": ["admin", "manager", "cashier"], // All can read
  "products.create": ["admin", "manager"], // Admin & Manager can create
  "products.edit": ["admin", "manager"], // Admin & Manager can edit
  "products.delete": ["admin", "manager"], // Admin & Manager can delete

  // Categories Management
  "categories.view": ["admin", "manager", "cashier"], // All can read
  "categories.create": ["admin", "manager"], // Admin & Manager can create
  "categories.edit": ["admin", "manager"], // Admin & Manager can edit
  "categories.delete": ["admin"], // Only Admin can delete

  // Transactions (will be extended when you provide more backend info)
  "transactions.view": ["admin", "manager", "cashier"],
  "transactions.create": ["admin", "manager", "cashier"],
  "transactions.edit": ["admin", "manager"],
  "transactions.delete": ["admin"],

  // Customers (assuming similar pattern to products)
  "customers.view": ["admin", "manager", "cashier"],
  "customers.create": ["admin", "manager"],
  "customers.edit": ["admin", "manager"],
  "customers.delete": ["admin", "manager"],

  // Settings & System
  "settings.general": ["admin", "manager", "cashier"], // General settings like change password
  "settings.users": ["admin"], // User management settings
  "settings.logs": ["admin", "manager"], // Activity logs
  "settings.system": ["admin"], // System configurations

  // Dashboard & Reports
  "dashboard.view": ["admin", "manager", "cashier"],
  "dashboard.analytics": ["admin", "manager"],
  "dashboard.reports": ["admin", "manager"],

  // Page-level permissions (for routing)
  "pages.users": ["admin"],
  "pages.products": ["admin", "manager", "cashier"],
  "pages.categories": ["admin", "manager", "cashier"],
  "pages.transactions": ["admin", "manager", "cashier"],
  "pages.customers": ["admin", "manager", "cashier"],
  "pages.settings": ["admin", "manager", "cashier"],
  "pages.dashboard": ["admin", "manager", "cashier"],
} as const;

/**
 * Role hierarchy - higher roles inherit permissions from lower roles
 */
export const ROLE_HIERARCHY = {
  admin: 3,
  manager: 2,
  cashier: 1,
} as const;

/**
 * Helper function to check if a role has higher or equal privilege than required role
 */
export function hasRoleHierarchy(
  userRole: string,
  requiredRole: string
): boolean {
  const userLevel =
    ROLE_HIERARCHY[userRole as keyof typeof ROLE_HIERARCHY] || 0;
  const requiredLevel =
    ROLE_HIERARCHY[requiredRole as keyof typeof ROLE_HIERARCHY] || 0;
  return userLevel >= requiredLevel;
}

/**
 * Get all permissions for a specific role
 */
export function getPermissionsForRole(role: string): string[] {
  return Object.entries(PERMISSIONS)
    .filter(([, roles]) => roles.includes(role as any))
    .map(([permission]) => permission);
}

/**
 * Check if a permission exists in the system
 */
export function isValidPermission(permission: string): boolean {
  return permission in PERMISSIONS;
}

export type Permission = keyof typeof PERMISSIONS;
export type Role = keyof typeof ROLE_HIERARCHY;
