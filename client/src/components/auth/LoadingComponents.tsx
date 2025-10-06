import React from "react";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  color?: "primary" | "secondary" | "white";
  className?: string;
}

export function LoadingSpinner({
  size = "md",
  color = "primary",
  className = "",
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
  };

  const colorClasses = {
    primary: "text-blue-600",
    secondary: "text-gray-600",
    white: "text-white",
  };

  return (
    <svg
      className={`animate-spin ${sizeClasses[size]} ${colorClasses[color]} ${className}`}
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
}

interface ButtonSkeletonProps {
  width?: string;
  height?: string;
  className?: string;
}

export function ButtonSkeleton({
  width = "w-24",
  height = "h-10",
  className = "",
}: ButtonSkeletonProps) {
  return (
    <div
      className={`${width} ${height} bg-gray-200 rounded-lg animate-pulse ${className}`}
    />
  );
}

interface AuthLoadingProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  showSpinner?: boolean;
}

/**
 * Enhanced loading component for auth-dependent content
 */
export function AuthLoading({
  children: _children,
  fallback,
  showSpinner = false,
}: AuthLoadingProps) {
  if (fallback) {
    return <>{fallback}</>;
  }

  if (showSpinner) {
    return (
      <div className="flex items-center justify-center p-4">
        <LoadingSpinner />
      </div>
    );
  }

  return null;
}

/**
 * Protected component with enhanced loading states
 */
interface ProtectedWithLoadingProps {
  children: React.ReactNode;
  permission?: string;
  fallback?: React.ReactNode;
  loadingFallback?: React.ReactNode;
  showLoadingSpinner?: boolean;
}

export function ProtectedWithLoading({
  children,
  permission: _permission,
  fallback: _fallback = null,
  loadingFallback,
  showLoadingSpinner = false,
}: ProtectedWithLoadingProps) {
  // This would use the Protected component internally
  // with enhanced loading states
  return (
    <AuthLoading fallback={loadingFallback} showSpinner={showLoadingSpinner}>
      {children}
    </AuthLoading>
  );
}
