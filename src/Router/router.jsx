import { createBrowserRouter } from "react-router-dom";
import Home from "../Pages/Home/Home";
import NotFound from "../Pages/NotFound/NotFound";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import AllVehicle from "../Pages/AllVehicle/AllVehicle";
import AddVehicle from "../Pages/AddVehicle/AddVehicle";
import MyVehicles from "../Pages/MyVehicles/MyVehicles";
import MyBookings from "../Pages/MyBookings/MyBookings";

import MainLayout from "../Layout/MainLayout";
import PrivateRoute from "../Private/PrivateRoute";
import Details from "../Pages/Details/Details";


const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index:true, Component: Home},
      { path: "/login", Component: Login},
      { path: "/register", Component: Register },
      { path: "/allVehicles", Component: AllVehicle },
      { path: "/addVehicle", element: <PrivateRoute><AddVehicle /></PrivateRoute> },
      { path: "/myVehicles", element: <PrivateRoute><MyVehicles /></PrivateRoute>   },
      { path: "/myBookings", element: <PrivateRoute><MyBookings /></PrivateRoute>   },
      { path: "/details/:id",
        loader: ({params})=>fetch(`http://localhost:3000/vehicles/${params.id}`), 
        element: <PrivateRoute><Details /></PrivateRoute>  },
    ],
  },
  { path: "*", element: <NotFound /> },
]);

export default router
