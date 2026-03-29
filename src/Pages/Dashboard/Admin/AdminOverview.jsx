import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../../Hooks/useAxios";
import LoadingSpinner from "../../../Component/shared/LoadingSpinner";
import StatCards from "../../../Component/Dashboard/Common/StatCards";
import {
  FaUsers,
  FaCar,
  FaWallet,
  FaExchangeAlt,
  FaThLarge,
} from "react-icons/fa";
import DashboardHeader from "../../../Component/Dashboard/Common/DashboardHeader";

const AdminOverview = () => {
  const axiosSecure = useAxios();

  const { data: adminData, isLoading } = useQuery({
    queryKey: ["admin-overview"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin-overview");
      return res.data;
    },
  });

  if (isLoading) return <LoadingSpinner minHeight="60vh" />;

  const statsForCards = [
    {
      label: "Total Agents",
      value: adminData?.stats?.totalUsers || 0,
      icon: <FaUsers />,
      color: "from-[var(--primary)]/20",
    },
    {
      label: "Global Fleet",
      value: adminData?.stats?.totalVehicles || 0,
      icon: <FaCar />,
      color: "from-[#F2CC8F]/20",
    },
    {
      label: "Total Revenue",
      value: `$${adminData?.stats?.totalRevenue || 0}`,
      icon: <FaWallet />,
      color: "from-[#D4AF37]/20",
    },
    {
      label: "System Bookings",
      value: adminData?.stats?.totalBookings || 0,
      icon: <FaExchangeAlt />,
      color: "from-[#C5A059]/20",
    },
  ];

  return (
    <div className="space-y-10 animate-fade-in pb-10">
      {/* Header */}
      <DashboardHeader
        title="System Control Center"
        subtitle="Global Platform Oversight & Analytics"
        role="admin"
        Icon={FaThLarge}
        statusText="Root Access Verified"
      />

      {/* Global Stats */}
      <StatCards data={statsForCards} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Global Transactions Table */}
        <div className="lg:col-span-2 bg-[var(--card-bg)] border border-[var(--primary)]/10 rounded-2xl p-8 shadow-sm overflow-hidden relative">
          <h3 className="text-sm font-black uppercase tracking-widest mb-6 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            Live Transaction Stream
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-[10px] uppercase tracking-widest opacity-30 border-b border-white/5">
                  <th className="pb-4">Transaction ID</th>
                  <th className="pb-4">Asset Class</th>
                  <th className="pb-4 text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {adminData?.recentTransactions?.map((tx, idx) => (
                  <tr
                    key={idx}
                    className="group hover:bg-white/[0.02] transition-all"
                  >
                    <td className="py-4 font-mono text-[10px] opacity-50">
                      {tx.transactionId?.slice(0, 15)}...
                    </td>
                    <td className="py-4">
                      <span className="text-xs font-bold uppercase tracking-tighter">
                        {tx.bookingDetails?.vehicleName}
                      </span>
                    </td>
                    <td className="py-4 text-right">
                      <span className="text-xs font-black text-[var(--primary)]">
                        $
                        {tx.bookingDetails?.totalPrice ||
                          tx.bookingDetails?.price ||
                          0}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* User Distribution & Elite Insight */}
        <div className="space-y-6">
          <div className="bg-[var(--card-bg)] border border-[var(--primary)]/10 rounded-2xl p-6">
            <h3 className="text-xs font-black uppercase tracking-widest mb-6 text-center">
              User Distribution
            </h3>
            <div className="space-y-4">
              {adminData?.userRoles?.map((role, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-3 ..."
                >
                  <span className="text-[10px] uppercase font-bold tracking-widest opacity-60">
                    {role._id || "General User"}
                  </span>
                  <span className="text-sm font-black text-[var(--primary)]">
                    {role.count}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOverview;
