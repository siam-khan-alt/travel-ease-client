import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Cell } from "recharts";
import { FaCar, FaClipboardList, FaArrowRight, FaChartLine } from "react-icons/fa";
import { Link } from "react-router-dom";
import LoadingSpinner from "../../Component/LoadingSpinner";

const DashboardHome = () => {
  const { users } = useContext(AuthContext);
  const [stats, setStats] = useState({ totalVehicles: 0, totalBookings: 0, chartData: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (users?.email) {
      fetch(`https://travel-ease-server-rho.vercel.app/user-stats/${users?.email}`)
        .then((res) => res.json())
        .then((data) => {
          setStats(data);
          setLoading(false);
        });
    }
  }, [users?.email]);

  const COLORS = ["#E07A5F", "#3D405B", "#81B29A", "#F2CC8F", "#E07A5F"];

  if (loading) {
    return <LoadingSpinner />;
  }
  return (
    <div className="space-y-10 pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-[#3D405B] dark:text-white">
            Dashboard <span className="text-[#E07A5F]">Overview</span>
          </h2>
          <p className="text-gray-500 dark:text-gray-400 font-medium">Welcome back, {users?.displayName}!</p>
        </div>
        <div className="bg-white dark:bg-[#1E293B] px-4 py-2 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 text-sm font-bold text-gray-500">
          Last Login: {new Date().toLocaleDateString()}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-[#1E293B] p-8 rounded-2xl shadow-sm border-b-8 border-[#E07A5F] hover:shadow-xl transition-all group">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Added Vehicles</p>
              <h3 className="text-5xl font-black text-[#3D405B] dark:text-white mt-2 group-hover:scale-110 transition-transform origin-left">{stats.totalVehicles}</h3>
            </div>
            <div className="p-5 bg-orange-50 dark:bg-orange-900/20 text-[#E07A5F] rounded-3xl">
              <FaCar size={32} />
            </div>
          </div>
          <Link to="/dashboard/my-vehicles" className="mt-8 flex items-center gap-2 text-sm font-bold text-[#E07A5F] hover:gap-4 transition-all uppercase">
            Manage Fleet <FaArrowRight />
          </Link>
        </div>

        <div className="bg-white dark:bg-[#1E293B] p-8 rounded-2xl shadow-sm border-b-8 border-[#3D405B] hover:shadow-xl transition-all group">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Total Bookings</p>
              <h3 className="text-5xl font-black text-[#3D405B] dark:text-white mt-2 group-hover:scale-110 transition-transform origin-left">{stats.totalBookings}</h3>
            </div>
            <div className="p-5 bg-blue-50 dark:bg-blue-900/20 text-[#3D405B] dark:text-blue-400 rounded-3xl">
              <FaClipboardList size={32} />
            </div>
          </div>
          <Link to="/dashboard/my-bookings" className="mt-8 flex items-center gap-2 text-sm font-bold text-[#3D405B] dark:text-blue-400 hover:gap-4 transition-all uppercase">
            Track Orders <FaArrowRight />
          </Link>
        </div>
      </div>

      <div className="bg-white dark:bg-[#1E293B] p-8 md:p-12 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
        <div className="flex items-center gap-3 mb-10">
          <div className="p-2 bg-[#E07A5F]/10 rounded-lg text-[#E07A5F]">
            <FaChartLine />
          </div>
          <h3 className="text-xl font-black text-[#3D405B] dark:text-white">Price Analytics per Vehicle</h3>
        </div>
        
        <div className="h-80 w-full">
          {stats.chartData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats.chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" opacity={0.5} />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fill: '#9CA3AF', fontSize: 11, fontWeight: 600}} 
                  dy={15}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fill: '#9CA3AF', fontSize: 11}} 
                />
                <Tooltip 
                  cursor={{fill: '#F3F4F6', opacity: 0.4}}
                  contentStyle={{ borderRadius: '20px', border: 'none', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)', padding: '15px' }} 
                />
                <Bar dataKey="price" radius={[12, 12, 0, 0]} barSize={60}>
                  {stats.chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-gray-400">
              <FaCar size={48} className="mb-4 opacity-20" />
              <p>No vehicle data available to display chart.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;