import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { authed, authLoading } = useAuth();
  const location = useLocation();

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Checking session…
      </div>
    );
  }

  if (!authed) {
    return <Navigate to="/auth" replace state={{ from: location }} />;
  }

  return children;
}
