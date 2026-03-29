import React from "react";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";

const HostRevenueChart = ({ data }) => {
  const chartData = data
    ?.filter((activity) => activity.status === "Paid")
    .map((activity, index) => {
      const grossAmount = parseFloat(activity.totalPrice) || 
                          (parseFloat(activity.price || 0) * parseInt(activity.totalDays || 1));
      
      const netRevenue = grossAmount * 0.9; // ১০% প্ল্যাটফর্ম ফি বাদ

      return {
        displayDate: new Date(activity.paidAt || activity.startDate).toLocaleDateString("en-GB", {
          day: "numeric",
          month: "short",
        }),
        fullName: activity.vehicleName,
        revenue: parseFloat(netRevenue.toFixed(2)),
        id: index,
      };
    })
    .reverse() || [];

  return (
    <div className="h-[380px] w-full bg-[var(--card-bg)] border border-[var(--primary)]/20 rounded-2xl p-6 shadow-sm relative overflow-hidden group">
      {/* Chart Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-[var(--primary)]">
            Revenue Analytics
          </p>
        </div>
        <h3 className="text-lg font-bold uppercase tracking-widest mt-1 text-[var(--text-main)]">
          Earnings Flow
        </h3>
      </div>

      <div className="h-[200px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
            <defs>
              <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="var(--primary)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(212, 175, 55, 0.05)" />
            <XAxis 
              dataKey="displayDate" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: "var(--text-main)", opacity: 0.4, fontSize: 9, fontWeight: "bold" }} 
              dy={15} 
            />
            <YAxis axisLine={false} tickLine={false} tick={{ fill: "var(--text-main)", opacity: 0.3, fontSize: 9 }} />
            
            <Tooltip
              contentStyle={{
                backgroundColor: "var(--card-bg)",
                border: "1px solid var(--primary)",
                borderRadius: "12px",
                fontSize: "11px",
                boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.3)",
              }}
              itemStyle={{ color: "var(--primary)", fontWeight: "bold" }}
              labelStyle={{ color: "var(--text-main)", marginBottom: "4px", fontSize: "10px", fontWeight: "800", textTransform: "uppercase" }}
              formatter={(value) => [`$${value}`, "Net Earnings"]}
              labelFormatter={(value, payload) => payload?.[0]?.payload?.fullName || value}
            />

            <Area
              type="monotone"
              dataKey="revenue"
              stroke="var(--primary)"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorRev)"
              dot={{ fill: "var(--card-bg)", stroke: "var(--primary)", strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, strokeWidth: 0, fill: "var(--primary)" }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Analytics Summary Footer */}
      <div className="mt-8 grid grid-cols-2 gap-4 border-t border-white/5 pt-5">
        <div className="text-left">
          <p className="text-[8px] uppercase font-bold opacity-40 tracking-widest">Avg. Per Trip</p>
          <p className="text-xs font-black text-[var(--text-main)]">
            ${chartData.length > 0 ? (chartData.reduce((acc, curr) => acc + curr.revenue, 0) / chartData.length).toFixed(0) : 0}
          </p>
        </div>
        <div className="text-right">
          <p className="text-[8px] uppercase font-bold opacity-40 tracking-widest">Total Net</p>
          <p className="text-[10px] font-black text-[var(--primary)] uppercase">
            ${chartData.reduce((acc, curr) => acc + curr.revenue, 0).toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default HostRevenueChart;