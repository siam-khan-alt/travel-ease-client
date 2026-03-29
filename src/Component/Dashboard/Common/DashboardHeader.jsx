import React from 'react';
import { FaUserShield, FaCrown, FaUserAlt, FaStar, FaShieldAlt } from 'react-icons/fa';

const DashboardHeader = ({ title, subtitle, statusText, Icon = FaUserShield, role = "user" }) => {
    
    const getStatusIcon = () => {
        if (role === "admin") return <FaCrown className="text-yellow-500" />;
        if (role === "host") return <FaStar className="text-orange-400" />;
        return <FaShieldAlt className="text-blue-400" />; // Default for User
    };

    return (
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
            {/* Left Side: Dynamic Page Icon & Title */}
            <div>
                <h1 className="text-3xl font-black uppercase tracking-tighter text-gradient-gold flex items-center justify-center md:justify-start gap-3">
                    <Icon className="text-[var(--primary)] hidden md:flex" /> {title}
                </h1>
                <p className="text-[var(--text-main)]/40 text-xs text-center md:text-left font-bold tracking-[0.3em] uppercase mt-1">
                    {subtitle}
                </p>
            </div>

            {/* Right Side: Role-based Status Bar */}
            <div className="flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest text-[var(--primary)] bg-[var(--primary)]/5 px-4 py-2 rounded-lg border border-[var(--primary)]/10">
                {getStatusIcon()} 
                <span className="opacity-80">{statusText || `${role} Session Active`}</span>
            </div>
        </div>
    );
};

export default DashboardHeader;