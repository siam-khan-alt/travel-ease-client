import { use } from "react";
import { AuthContext } from "../Context/AuthContext";
import { Navigate, useLocation } from "react-router-dom";
import LoadingSpinner from "../Component/shared/LoadingSpinner";



const PrivateRoute = ({ children }) => {
  const { users, loading } = use(AuthContext);

  const location = useLocation();
  if (loading) return <LoadingSpinner/>

  if (!users) {
    return <Navigate to="/login" state={location.pathname} />;
  }

  return children;
};

export default PrivateRoute;