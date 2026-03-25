import { createBrowserRouter } from "react-router-dom";
import Home from "../Pages/Public/Home";
import NotFound from "../Pages/Public/NotFound";
import Login from "../Pages/Auth/Login";
import Register from "../Pages/Auth/Register";
import AllVehicle from "../Pages/Public/AllVehicle";
import AddVehicle from "../Pages/Dashboard/Host/AddVehicle";
import MyBookings from "../Pages/Dashboard/User/MyBookings";
import MainLayout from "../Layout/MainLayout";
import PrivateRoute from "../Private/PrivateRoute";
import Details from "../Pages/Public/Details";
import AboutUs from "../Pages/Public/AboutUs";
import DashboardLayout from "../Layout/DashboardLayout";
import Profile from "../Pages/Profile/Profile";
import Contact from "../Pages/Public/Contact";
import LoadingSpinner from "../Component/shared/LoadingSpinner";
import Payment from "../Pages/Payment/Payment";
import Overview from "../Pages/Dashboard/Overview";
import PaymentHistory from "../Pages/Dashboard/User/PaymentHistory";
import ManageBookings from "../Pages/Dashboard/Host/ManageBookings";
import MyVehicles from "../Pages/Dashboard/Host/MyVehicle";
import UpdateVehicle from "../Pages/Dashboard/Host/UpdateVehicle";
import HostAnalytics from "../Pages/Dashboard/Host/HostAnalytics";
import ManageUsers from "../Pages/Dashboard/Admin/ManageUsers";
import VerifyVehicles from "../Pages/Dashboard/Admin/VerifyVehicles";
import AllBookings from "../Pages/Dashboard/Admin/AllBookings";
import RevenueAnalytics from "../Pages/Dashboard/Admin/RevenueAnalytics";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, Component: Home },
      { path: "/login", Component: Login },
      { path: "/register", Component: Register },
      { path: "/allVehicles", Component: AllVehicle },
      { path: "/about", Component: AboutUs },
      { path: "/contact", Component: Contact },
      { path: "/payment/:id", Component: Payment },
      {
        path: "/details/:id",
        loader: ({ params }) =>
          fetch(
            `https://travel-ease-server-rho.vercel.app/vehicles/${params.id}`
          ),
        Component: Details,
        HydrateFallback: LoadingSpinner,
      },
      {
        path: "/updateVehicle/:id",
        loader: ({ params }) =>
          fetch(
            `https://travel-ease-server-rho.vercel.app/vehicles/${params.id}`
          ),
        element: (
          <PrivateRoute>
            <UpdateVehicle />
          </PrivateRoute>
        ),
        HydrateFallback: LoadingSpinner,
      },

      { path: "/*", element: <NotFound /> },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      // Common Routes
      {
        path: "overview",
        element: <Overview />,
      },
      {
        path: "profile",
        element: <Profile />,
      },

      // --- User (Customer) Routes ---
      {
        path: "my-bookings",
        element: <MyBookings />,
      },
      {
        path: "payment-history",
        element: <PaymentHistory />,
      },
      {
        path: "wishlist",
        element: (
          <div className="text-[var(--primary)] p-10 font-bold uppercase tracking-widest">
            Wishlist: Secure Vault Accessing...
          </div>
        ), // Placeholder
      },

      // --- Host (Owner) Routes ---
      {
        path: "add-vehicle",
        element: <AddVehicle />,
      },
      {
        path: "my-listings",
        element: <MyVehicles />,
      },
      {
        path: "booking-requests",
        element: <ManageBookings/>, 
      },
      {
        path: "host-analytics",
        element: <HostAnalytics/>,
      },
      {
        path: "update-vehicle/:id",
        element: <UpdateVehicle />,
      },

      // --- Admin Routes ---
      {
        path: "manage-users",
        element: <ManageUsers/>
      },
      {
        path: "verify-vehicles",
        element: <VerifyVehicles/>
      },
      {
        path: "all-bookings",
        element:<AllBookings/>
      },
      {
        path: "revenue",
        element: <RevenueAnalytics/>
      },
    ],
  },
  { path: "*", element: <NotFound /> },
]);

export default router;
