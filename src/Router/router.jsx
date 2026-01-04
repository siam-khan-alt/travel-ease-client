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
import UpdateVehicle from "../Component/UpdateVehicle";
import LoadingSpinner from "../Component/LoadingSpinner";
import About from "../Pages/About/About";
import DashboardLayout from "../Layout/DashboardLayout";
import Profile from "../Pages/Profile/Profile";
import DashboardHome from "../Pages/DashboardHome/DashboardHome";
import Contact from "../Pages/Contact/Contact";


const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index:true, Component: Home},
      { path: "/login", Component: Login},
      { path: "/register", Component: Register },
      { path: "/allVehicles", Component: AllVehicle },
      { path: "/about", Component: About },
      { path: "/contact", Component: Contact },
      { path: "/details/:id",
        loader: ({params})=>fetch(`https://travel-ease-server-rho.vercel.app/vehicles/${params.id}`), 
        Component: Details ,
        HydrateFallback:LoadingSpinner
       },
        { path: "/updateVehicle/:id",
        loader: ({params})=>fetch(`https://travel-ease-server-rho.vercel.app/vehicles/${params.id}`), 
        element: <PrivateRoute><UpdateVehicle /></PrivateRoute>,
      HydrateFallback:LoadingSpinner  },
     
      { path: "/*", element: <NotFound /> }
    ],
  },
   {
    path: "/dashboard",
    element: <PrivateRoute><DashboardLayout /></PrivateRoute>, 
    children: [
      {
        path: "home", 
        element: <DashboardHome />
      },
      {
        path: "profile", 
        element: <Profile />
      },
      {
        path: "add-vehicle", 
        element: <AddVehicle />
      },
      {
        path: "my-vehicles", 
        element: <MyVehicles />
      },
      {
        path: "my-bookings", 
        element: <MyBookings />
      },
      {
        path: "update-vehicle/:id",
        loader: ({ params }) => fetch(`https://travel-ease-server-rho.vercel.app/vehicles/${params.id}`),
        element: <UpdateVehicle />,
        HydrateFallback: LoadingSpinner
      },
    ]
  },
  { path: "*", element: <NotFound /> },
]);

export default router
