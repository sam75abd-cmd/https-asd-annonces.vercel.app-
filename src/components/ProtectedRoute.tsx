import { Navigate, useLocation } from "react-router-dom";
import type { ReactNode } from "react";
import { useAuth } from "../context/AuthContext";

export function ProtectedRoute({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="container-app flex h-64 items-center justify-center text-sm text-gray-500">
        Chargement...
      </div>
    );
  }

  if (!user) {
    return (
      <Navigate to="/connexion" replace state={{ from: location.pathname }} />
    );
  }

  return <>{children}</>;
}
