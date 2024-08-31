import { Navigate, useLocation } from "react-router";
import useAuth from "./../hooks/useAuth";
import useStoreMan from "../hooks/useStoreMan";


const StoreManRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const [isStoreMan, isStoreManLoading] = useStoreMan();
  const location = useLocation();

  if (loading || isStoreManLoading) {
    return <progress className="progress w-56"></progress>;
  }

  if (user && isStoreMan) {
    return children;
  }
  return (
    <Navigate to="/home" ></Navigate>
  );
};

export default StoreManRoute;
