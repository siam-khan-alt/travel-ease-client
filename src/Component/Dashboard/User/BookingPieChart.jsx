import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";

const BookingPieChart = ({ data }) => {
  const chartData =
    data
      ?.filter((activity) => activity.status === "Paid")
      .map((activity, index) => {
        const finalAmount =
          parseFloat(activity.totalPrice) ||
          parseFloat(activity.price || 0) * parseInt(activity.totalDays || 1);

        return {
          displayDate: new Date(
            activity.startDate || activity.requestDate
          ).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "short",
          }),
          fullName: activity.vehicleName,
          price: finalAmount,
          id: index,
        };
      })
      .reverse() || [];
  return (
    <div className="h-[380px] w-full bg-[var(--card-bg)] border border-[var(--primary)]/20 rounded-2xl p-6 shadow-sm relative overflow-hidden group">
      {/* Chart Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[var(--primary)] animate-ping"></span>
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-[var(--primary)]">
            Expense Analytics
          </p>
        </div>
        <h3 className="text-lg font-bold uppercase tracking-widest  mt-1 text-[var(--primary)]">
          Payment History
        </h3>
      </div>

      <div className="h-[200px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={chartData}
            margin={{ top: 10, right: 10, left: -25, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#D4AF37" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#D4AF37" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="rgba(212, 175, 55, 0.05)"
            />
            <XAxis
              dataKey="displayDate"
              axisLine={false}
              tickLine={false}
              tick={{
                fill: "rgba(255,255,255,0.4)",
                fontSize: 9,
                fontWeight: "bold",
              }}
              dy={15}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 9 }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "var(--card-bg)",
                border: "1px solid var(--primary)",
                borderRadius: "12px",
                fontSize: "11px",
                fontFamily: "Poppins",
                boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
              }}
              itemStyle={{
                color: "var(--primary)",
                fontWeight: "bold",
              }}
              labelStyle={{
                color: "var(--text-main)",
                marginBottom: "4px",
                opacity: 0.8,
                fontSize: "10px",
                fontWeight: "800",
                textTransform: "uppercase",
              }}
              formatter={(value) => [`$${value}`, "Amount Paid"]}
              labelFormatter={(value, payload) => {
                if (payload && payload.length > 0) {
                  return payload[0].payload.fullName;
                }
                return value;
              }}
            />
            <Area
              type="monotone"
              dataKey="price"
              stroke="#D4AF37"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorPrice)"
              dot={{ fill: "#0A0F14", stroke: "#D4AF37", strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, strokeWidth: 0, fill: "#F2CC8F" }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Analytics Summary Footer */}
      <div className="mt-8 grid grid-cols-2 gap-4 border-t border-white/5 pt-5">
        <div className="text-left">
          <p className="text-[8px] uppercase font-bold opacity-40 tracking-widest">
            Avg. Ticket
          </p>
          <p className="text-xs font-black text-white">
            $
            {chartData.length > 0
              ? (
                  chartData.reduce((acc, curr) => acc + curr.price, 0) /
                  chartData.length
                ).toFixed(0)
              : 0}
          </p>
        </div>
        <div className="text-right">
          <p className="text-[8px] uppercase font-bold opacity-40 tracking-widest">
            Last Activity
          </p>
          <p className="text-[10px] font-black text-[var(--primary)] uppercase">
            {chartData.length > 0
              ? chartData[chartData.length - 1].date
              : "N/A"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default BookingPieChart;
