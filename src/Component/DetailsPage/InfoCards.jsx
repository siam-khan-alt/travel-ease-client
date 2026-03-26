import React from "react";
import { FaCheckCircle, FaAward } from "react-icons/fa";

const InfoCards = ({ vehicle }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-24">
      <div className="bg-[var(--card-bg)] p-8 rounded-2xl border border-[var(--primary)]/10">
        <h3 className="text-xl font-black uppercase mb-6 text-gradient-gold">Overview</h3>
        <p className="text-sm italic opacity-70 leading-relaxed">"{vehicle.description}"</p>
        <div className="mt-8 flex items-center gap-4 border-t border-[var(--primary)]/10 pt-8">
          <div className="w-10 h-10 bg-[var(--primary)]/20 rounded-full flex items-center justify-center font-bold">{vehicle.owner?.charAt(0)}</div>
          <div><p className="text-[8px] opacity-40 uppercase">Owner</p><p className="text-xs font-bold uppercase">{vehicle.owner}</p></div>
        </div>
      </div>

      <div className="bg-[var(--card-bg)] p-8 rounded-2xl border border-[var(--primary)]/10">
        <h3 className="text-xl font-black uppercase mb-6 text-gradient-gold">Features</h3>
        <div className="space-y-3">
          {vehicle.features?.map((f, i) => (
            <div key={i} className="flex items-center gap-3 bg-[var(--bg-main)]/50 p-3 rounded-xl"><FaCheckCircle className="text-[var(--primary)]" /><span className="text-[10px] font-bold uppercase">{f}</span></div>
          ))}
        </div>
      </div>

      <div className="bg-[var(--card-bg)] p-8 rounded-2xl border border-[var(--primary)]/10">
        <h3 className="text-xl font-black uppercase mb-6 text-gradient-gold">Policies</h3>
        <ul className="space-y-4">
          {vehicle.rules?.map((r, i) => (
            <li key={i} className="flex gap-3 text-sm opacity-60"><div className="w-1.5 h-1.5 bg-[var(--primary)] rounded-full mt-1.5 shrink-0" />{r}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default InfoCards;