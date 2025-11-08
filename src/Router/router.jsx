import { createBrowserRouter } from "react-router-dom";
import Home from "../Pages/Home/Home";
import NotFound from "../Pages/NotFound/NotFound";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import AllVehicle from "../Pages/AllVehicle/AllVehicle";
import AddVehicle from "../Pages/AddVehicle/AddVehicle";
import MyVehicles from "../Pages/MyVehicles/MyVehicles";
import MyBookings from "../Pages/MyBookings/MyBookings";
import Details from "../Pages/Details/Details";
import MainLayout from "../Layout/MainLayout";


const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index:true, Component: Home},
      { path: "/login", Component: Login},
      { path: "/register", Component: Register },
      { path: "/allVehicles", Component: AllVehicle },
      { path: "/addVehicle", element: <AddVehicle /> },
      { path: "/myVehicles", element: <MyVehicles /> },
      { path: "/myBookings", element:<MyBookings />},
      { path: "/details/:id", element:<Details />},
    ],
  },
  { path: "*", element: <NotFound /> },
]);

export default router
