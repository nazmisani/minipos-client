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
  "products.update": ["admin", "manager"], // Admin & Manager can update (alias for edit)
  "products.delete": ["admin", "manager"], // Admin & Manager can delete

  // Categories Management
  "categories.view": ["admin", "manager", "cashier"], // All can read
  "categories.create": ["admin", "manager"], // Admin & Manager can create
  "categories.edit": ["admin", "manager"], // Admin & Manager can edit
  "categories.delete": ["admin"], // Only Admin can delete
  "categories.manage": ["admin", "manager"], // Admin & Manager can manage categories

  // Transactions - Based on actual backend endpoints
  "transactions.view": ["admin", "manager"], // GET /transactions → Admin, Manager only
  "transactions.viewDetail": ["admin", "manager", "cashier"], // GET /transactions/:id → Admin, Manager, Cashier
  "transactions.create": ["admin", "cashier"], // POST /transactions → Admin, Cashier
  "transactions.delete": ["admin"], // DELETE /transactions/:id → Admin only

  // Customers - Based on actual backend endpoints
  "customers.view": ["admin", "manager", "cashier"], // GET /customers → Admin, Manager, Cashier
  "customers.create": ["admin", "manager", "cashier"], // POST /customers → Admin, Manager, Cashier
  "customers.edit": ["admin", "manager"], // PUT /customers/:id → Admin, Manager
  "customers.delete": ["admin"], // DELETE /customers/:id → Admin only

  // Settings & System - Based on actual backend endpoints
  "settings.general": ["admin", "manager", "cashier"], // General settings like change password
  "settings.users": ["admin"], // User management settings
  "settings.logs": ["admin"], // GET /logs → Admin only
  "settings.system": ["admin"], // System configurations

  // Dashboard & Reports
  "dashboard.view": ["admin", "manager", "cashier"],
  "dashboard.analytics": ["admin", "manager"],
  "dashboard.reports": ["admin", "manager"],

  // Page-level permissions (for routing)
  "pages.users": ["admin"],
  "pages.products": ["admin", "manager", "cashier"],
  "pages.categories": ["admin", "manager", "cashier"],
  "pages.transactions": ["admin", "manager"], // Only admin & manager can access transaction list page
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
