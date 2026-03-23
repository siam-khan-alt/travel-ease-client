import React from "react";

const StatCards = ({ data }) => {
  if (!data || data.length === 0) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {data.map((card, idx) => (
        <div 
          key={idx} 
          className={`relative group overflow-hidden bg-gradient-to-br ${card.color || 'from-[var(--primary)]/10'} to-transparent border border-[var(--primary)]/10 p-6 rounded-2xl transition-all duration-500 hover:shadow-sm hover:shadow-[var(--primary)]/5 hover:-translate-y-1`}
        >
          {/* Background Decorative Icon (Unique Touch) */}
          <div className="absolute -right-4 -bottom-4 text-6xl opacity-[0.03] group-hover:opacity-[0.07] group-hover:scale-110 transition-all duration-500">
            {card.icon}
          </div>

          <div className="flex justify-between items-start">
            <div className="space-y-4">
              {/* Icon Circle */}
              <div className="w-10 h-10 rounded-xl bg-[var(--card-bg)] border border-[var(--primary)]/20 flex items-center justify-center text-[var(--primary)] shadow-inner">
                {card.icon}
              </div>
              
              <div>
                <p className="text-[10px] uppercase tracking-[0.25em] font-black text-[var(--text-main)]/40 group-hover:text-[var(--primary)] transition-colors">
                  {card.label}
                </p>
                <h2 className="text-3xl font-black mt-1 text-[var(--text-main)] tracking-tight">
                  {card.value}
                </h2>
              </div>
            </div>

            {/* Optional Trend Indicator (Unique Option) */}
            {card.trend && (
              <span className={`text-[9px] font-bold px-2 py-1 rounded-full border ${
                card.trendType === 'up' 
                ? 'bg-green-500/10 text-green-500 border-green-500/20' 
                : 'bg-red-500/10 text-red-500 border-red-500/20'
              }`}>
                {card.trendType === 'up' ? '▲' : '▼'} {card.trend}
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatCards;