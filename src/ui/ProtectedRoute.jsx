import { Outlet, useNavigate } from "react-router";
import LoadingSpinner from "./LoadingSpinner";
import { useUser } from "../features/authentication/useUser";
import { useEffect } from "react";

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const { isLoading, isAuthenticated } = useUser();

  useEffect(
    function () {
      if (!isAuthenticated && !isLoading) navigate("/login");
    },
    [isAuthenticated, isLoading, navigate]
  );

  if (isLoading) return <LoadingSpinner type="full" />;

  if (isAuthenticated) return <Outlet />;
}

export default ProtectedRoute;
