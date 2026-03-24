import React from "react";
import useRole from "../../Hooks/useRole";
import AdminOverview from "./Admin/AdminOverview";
import HostOverview from "./Host/HostOverview";
import UserOverview from "./User/UserOverview";
import LoadingSpinner from "../../Component/shared/LoadingSpinner";


const Overview = () => {
  const [role, isRoleLoading] = useRole();

  if (isRoleLoading) return <LoadingSpinner minHeight="60vh" />

  return (
    <div className="animate-fade-in">
      {role === "admin" && <AdminOverview />}
      {role === "host" && <HostOverview />}
      {role === "user" && <UserOverview />}
    </div>
  );
};

export default Overview;