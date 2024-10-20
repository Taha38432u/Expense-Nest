import useLogIn from "../features/authentication/useLogIn.js";
import Spinner from "./Spinner.jsx";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useUser from "../features/authentication/useUser.js";

function ProtectedRoute({ children }) {
  const { user, isLoading, isAuthenticated } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      navigate("/login");
    }
  }, [isAuthenticated, isLoading, navigate]);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-900">
        <Spinner />
      </div>
    );
  }

  if (isAuthenticated) return children;
}

export default ProtectedRoute;
