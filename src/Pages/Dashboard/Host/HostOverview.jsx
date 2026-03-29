import React, { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../../Context/AuthContext";
import useAxios from "../../../Hooks/useAxios";
import LoadingSpinner from "../../../Component/shared/LoadingSpinner";
import {
  FaCarSide,
  FaChartLine,
  FaCubes,
  FaHistory,
  FaMoneyBillWave,
} from "react-icons/fa";
import StatCards from "../../../Component/Dashboard/Common/StatCards";
import HostRevenueChart from "../../../Component/Dashboard/Host/HostRevenueChart";

const HostOverview = () => {
  const { users } = useContext(AuthContext);
  const axiosSecure = useAxios();

  const { data: hostData, isLoading } = useQuery({
    queryKey: ["host-overview", users?.email],
    enabled: !!users?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/host-overview/${users?.email}`);
      return res.data;
    },
  });

  if (isLoading) return <LoadingSpinner minHeight="60vh" />;

  const statsForCards = [
    {
      label: "Total Fleet",
      value: hostData?.stats?.totalVehicles || 0,
      icon: <FaCarSide />,
      color: "from-[var(--primary)]/20",
    },
    {
      label: "Total Revenue",
      value: `$${hostData?.stats?.totalRevenue || 0}`,
      icon: <FaMoneyBillWave />,
      color: "from-[#F2CC8F]/20",
    },
    {
      label: "Total Orders",
      value: hostData?.stats?.totalBookings || 0,
      icon: <FaChartLine />,
      color: "from-[#D4AF37]/20",
    },
    {
      label: "Operational Assets",
      value: hostData?.stats?.activeAssets || 0,
      icon: <FaCubes />,
      color: "from-[#C5A059]/20",
    },
  ];

  return (
    <div className="space-y-10 animate-fade-in pb-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black uppercase tracking-tighter text-gradient-gold !text-center md:!text-left">
            Host Command Center
          </h1>
          <p className="text-[var(--text-main)]/40 text-xs font-bold tracking-[0.3em] uppercase mt-1">
            Fleet Management Profile: {users?.displayName}
          </p>
        </div>
        <div className="text-[10px] font-mono text-[var(--primary)]/50 bg-[var(--primary)]/5 px-4 py-2 rounded-full border border-[var(--primary)]/10">
          Sync Status: Operational
        </div>
      </div>

      {/* Stats Section */}
      <StatCards data={statsForCards} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Incoming Bookings Table */}
        <div className="lg:col-span-2 bg-[var(--card-bg)] border border-[var(--primary)]/10 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-6">
            <FaHistory className="text-[var(--primary)]" />
            <h3 className="text-sm text-[var(--primary)] font-bold uppercase tracking-widest">
              Recent Fleet Requests
            </h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-[10px] uppercase tracking-widest opacity-30 border-b border-white/5">
                  <th className="pb-4">Asset</th>
                  <th className="pb-4">Customer</th>
                  <th className="pb-4 text-right">Revenue</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {hostData?.recentActivity?.map((activity, idx) => (
                  <tr key={idx} className="group">
                    <td className="py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={activity.image || activity.coverImage}
                          className="w-10 h-10 rounded-lg object-cover grayscale group-hover:grayscale-0 transition-all"
                          alt=""
                        />
                        <span className="text-xs font-bold uppercase">
                          {activity.vehicleName}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 text-[11px] opacity-60 font-medium">
                      {activity.userName}
                    </td>
                    <td className="py-4 text-right text-xs font-black text-[var(--primary)]">
                      $
                      {activity.totalPrice ||
                        activity.price * activity.totalDays}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {!hostData?.recentActivity?.length && (
              <p className="text-center py-10 text-[10px] uppercase opacity-20 tracking-widest">
                No active deployments
              </p>
            )}
          </div>
        </div>

        {/* Chart and Elite Tip */}
        <div className="lg:col-span-1 space-y-6">
          <HostRevenueChart data={hostData?.recentActivity || []} />

          <div className="bg-gradient-to-br from-[#D4AF37]/10 to-transparent border border-[#D4AF37]/20 p-6 rounded-2xl relative overflow-hidden group">
            <div className="absolute -right-4 -top-4 opacity-5 group-hover:scale-125 transition-transform duration-700">
              <FaCarSide size={80} />
            </div>
            <p className="text-[10px] font-black uppercase tracking-widest text-[var(--primary)]">
              Fleet Strategy
            </p>
            <p className="text-xs mt-2 leading-relaxed opacity-60 italic">
              "Agent, your revenue flow is steady. Deploying high-tier luxury
              assets could increase your margin by 15%."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HostOverview;
