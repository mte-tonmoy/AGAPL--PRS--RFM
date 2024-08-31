import { Navigate, useLocation } from "react-router";
import useAuth from "./../hooks/useAuth";
import useManager from "../hooks/useManager";

const ManagerRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const [isManager, isManagerLoading] = useManager();
  const location = useLocation();

  if (loading || isManagerLoading) {
    return <progress className="progress w-56"></progress>;
  }

  if (user && isManager) {
    return children;
  }
  return (
    <Navigate to="/home" ></Navigate>
  );
};

export default ManagerRoute;
