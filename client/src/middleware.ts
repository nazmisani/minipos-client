import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtDecode } from "jwt-decode";

// Route to permission mapping
const ROUTE_PERMISSIONS: Record<string, string> = {
  "/dashboard": "pages.dashboard",
  "/products": "pages.products",
  "/categories": "pages.categories",
  "/transactions": "pages.transactions",
  "/customers": "pages.customers",
  "/settings": "pages.settings",
  // Add routes
  "/products/add": "products.create",
  "/customers/add": "customers.create",
  "/categories/add": "categories.create",
};

// Permission to role mapping (should match backend)
const PERMISSIONS: Record<string, string[]> = {
  "pages.dashboard": ["admin", "manager", "cashier"],
  "pages.products": ["admin", "manager", "cashier"],
  "pages.categories": ["admin", "manager", "cashier"],
  "pages.transactions": ["admin", "manager", "cashier"],
  "pages.customers": ["admin", "manager", "cashier"],
  "pages.settings": ["admin", "manager", "cashier"],
  "products.create": ["admin", "manager"],
  "customers.create": ["admin", "manager"],
  "categories.create": ["admin", "manager"],
};

function hasPermission(userRole: string, permission: string): boolean {
  const allowedRoles = PERMISSIONS[permission];
  return allowedRoles ? allowedRoles.includes(userRole) : false;
}

function getRequiredPermission(pathname: string): string | null {
  // Check exact matches first
  if (ROUTE_PERMISSIONS[pathname]) {
    return ROUTE_PERMISSIONS[pathname];
  }

  // Check for pattern matches (e.g., /products/123/edit)
  for (const [routePattern, permission] of Object.entries(ROUTE_PERMISSIONS)) {
    if (pathname.startsWith(routePattern + "/") || pathname === routePattern) {
      return permission;
    }
  }

  return null;
}

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const pathname = req.nextUrl.pathname;

  // Public routes that don't need authentication
  const publicRoutes = ["/", "/login", "/register"];
  if (publicRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  // Check authentication
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Decode and validate token
  try {
    const decoded = jwtDecode(token) as { role: string; exp?: number };

    // Check if token is expired
    if (decoded.exp && decoded.exp < Date.now() / 1000) {
      console.log("Token expired, redirecting to login");
      return NextResponse.redirect(new URL("/login", req.url));
    }

    const userRole = decoded.role;

    // Validate role exists
    if (!userRole) {
      console.log("No role in token, redirecting to login");
      return NextResponse.redirect(new URL("/login", req.url));
    }

    // Get required permission for this route
    const requiredPermission = getRequiredPermission(pathname);

    // If route requires permission, check it
    if (requiredPermission && !hasPermission(userRole, requiredPermission)) {
      // Redirect to dashboard for unauthorized access
      console.log(
        `User ${userRole} lacks permission ${requiredPermission} for ${pathname}`
      );
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    return NextResponse.next();
  } catch (error) {
    // Invalid token, redirect to login
    console.error("Token decode error in middleware:", error);
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  matcher: [
    // Match most routes but let client handle auth for better UX
    "/((?!api|_next/static|_next/image|favicon.ico|login|register|$).*)",
  ],
};
