import { use } from "react";
import { AuthContext } from "../Context/AuthContext";
import { useLocation } from "react-router-dom";



const PrivateRoute = ({ children }) => {
  const { users, loading } = use(AuthContext);

  const location = useLocation();
  if (loading) {
    return <p>Loading..</p>
  }

  if (!users) {
    return <Navigate to="/login" state={location.pathname} />;
  }

  return children;
};

export default PrivateRoute;