import React from "react";
import useRole from "../../Hooks/useRole";
import AdminOverview from "./Admin/AdminOverview";
import HostOverview from "./Host/HostOverview";
import UserOverview from "./User/UserOverview";


const Overview = () => {
  const [role, isRoleLoading] = useRole();

  if (isRoleLoading) return <div className="min-h-screen flex justify-center items-center text-[var(--primary)]">Accessing Secure Terminal...</div>;

  return (
    <div className="animate-fade-in">
      {role === "admin" && <AdminOverview />}
      {role === "host" && <HostOverview />}
      {role === "user" && <UserOverview />}
    </div>
  );
};

export default Overview;