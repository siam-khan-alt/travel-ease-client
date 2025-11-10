import { use } from "react";
import { AuthContext } from "../Context/AuthContext";
import { Navigate, useLocation } from "react-router-dom";



const PrivateRoute = ({ children }) => {
  const { users, loading } = use(AuthContext);

  const location = useLocation();
  if (loading) {
    return <div className="flex justify-center items-center h-64">
      <div className="md:w-14 w-10 h-10 md:h-14 border-4 border-t-[#E07A5F] border-b-[#F2CC8F] border-gray-300 dark:border-gray-600 dark:border-t-[#F2CC8F] dark:border-b-[#E07A5F] rounded-full animate-spin"></div>
    </div>
  }

  if (!users) {
    return <Navigate to="/login" state={location.pathname} />;
  }

  return children;
};

export default PrivateRoute;