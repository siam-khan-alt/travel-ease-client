import React, { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../../Context/AuthContext";
import useAxios from "../../../Hooks/useAxios";
import LoadingSpinner from "../../../Component/shared/LoadingSpinner";
import { FaCar, FaWallet, FaShieldAlt, FaHistory, FaHeart } from "react-icons/fa";
import StatCards from "../../../Component/Dashboard/Common/StatCards";
import BookingPieChart from "../../../Component/Dashboard/User/BookingPieChart";

const UserOverview = () => {
  const { users } = useContext(AuthContext);
  const axiosSecure = useAxios();

  const { data: overviewData, isLoading } = useQuery({
    queryKey: ["user-overview", users?.email],
    enabled: !!users?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/user-overview/${users?.email}`);
      return res.data;
    },
  });

  if (isLoading) return <LoadingSpinner minHeight="60vh" />;

  // Dynamic Stat Data for the Reusable StatCards Component
  const statsForCards = [
    {
      label: "Total Bookings",
      value: overviewData?.stats?.totalBookings || 0,
      icon: <FaCar />,
      color: "from-[var(--primary)]/20", 
    },
    {
      label: "Total Spent",
      value: `$${overviewData?.stats?.totalSpent || 0}`,
      icon: <FaWallet />,
      color: "from-[#F2CC8F]/20", 
    },
    {
      label: "Wishlist Items", 
      value: overviewData?.stats?.wishlistCount || 0, 
      icon: <FaHeart />,
       color: "from-[#D4AF37]/20",  
    },
    {
      label: "Security Level",
      value: "Verified",
      icon: <FaShieldAlt />,
      color: "from-[#C5A059]/20", 
    },
  ];

  return (
    <div className="space-y-10 animate-fade-in pb-10">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black md:!text-left uppercase tracking-tighter text-gradient-gold">
            System Overview
          </h1>
          <p className="text-[var(--text-main)]/40 text-xs font-bold tracking-[0.3em] text-center md:text-left uppercase mt-1">
            Welcome back, Agent {users?.displayName?.split(" ")[0]}
          </p>
        </div>
        <div className="text-[10px] font-mono text-[var(--primary)]/50 bg-[var(--primary)]/5 px-4 py-2 rounded-full border border-[var(--primary)]/10">
          Last Sync: {new Date().toLocaleTimeString()}
        </div>
      </div>

      {/* 1. Dynamic Stat Cards */}
      <StatCards data={statsForCards} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* 2. Recent Activity Feed (Left) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-[var(--card-bg)] border border-[var(--primary)]/10 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-6">
              <FaHistory className="text-[var(--primary)]" />
              <h3 className="text-sm text-[var(--primary)] font-bold uppercase tracking-widest">Recent Deployments</h3>
            </div>
            
            <div className="space-y-4">
              {overviewData?.recentActivity?.length > 0 ? (
                overviewData.recentActivity.map((activity, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 rounded-2xl bg-[var(--primary)]/5 border border-[var(--primary)]/5 hover:border-[var(--primary)]/20 transition-all group">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl overflow-hidden grayscale group-hover:grayscale-0 transition-all">
                        <img src={activity.image} alt="" className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <p className="text-xs font-bold uppercase">{activity.vehicleName}</p>
                        <p className="text-[10px] opacity-40">{new Date(activity.date).toDateString()}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-black text-[var(--primary)]">${activity.price}</p>
                      <p className="text-[9px] uppercase tracking-tighter opacity-30">{activity.status || 'Success'}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center py-10 text-[10px] uppercase opacity-20 tracking-[0.5em]">No recent logs</p>
              )}
            </div>
          </div>
        </div>

        {/* 3. Distribution Chart (Right) */}
        <div className="lg:col-span-1">
          <BookingPieChart data={overviewData?.recentActivity || []} />
          
          {/* Extra Info Card */}
          <div className="mt-6 bg-gradient-to-br from-[var(--primary)]/10 to-transparent border border-[var(--primary)]/20 p-6 rounded-2xl">
             <p className="text-[10px] font-black uppercase tracking-widest text-[var(--primary)]">Elite Tip</p>
             <p className="text-xs mt-2 leading-relaxed opacity-60 italic">
               "Keep booking luxury vehicles to maintain your 'Commander' status and unlock exclusive port access."
             </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserOverview;