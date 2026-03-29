import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area, Legend, LineChart, Line } from 'recharts';
import useAxios from '../../../Hooks/useAxios';
import LoadingSpinner from '../../../Component/shared/LoadingSpinner';
import { FaChartLine } from 'react-icons/fa';
import DashboardHeader from '../../../Component/Dashboard/Common/DashboardHeader';

const COLORS = ['#D4AF37', '#C5A059', '#F2CC8F', '#B8860B', '#DAA520'];

const RevenueAnalytics = () => {
    const axiosSecure = useAxios();
    const { data, isLoading, isError } = useQuery({
        queryKey: ['admin-revenue'],
        queryFn: async () => {
            const res = await axiosSecure.get('/admin-revenue-analytics');
            return res.data;
        }
    });

    if (isLoading) return <LoadingSpinner />;
    if (isError || !data) return <div className="text-center py-20 text-red-500 font-bold uppercase">System Intelligence Offline</div>;

    const chartStyle = "bg-[var(--card-bg)] p-6 rounded-2xl border border-[var(--primary)]/10 shadow-sm";
    const titleStyle = "text-[var(--primary)] text-[10px] font-black uppercase mb-6 tracking-[0.2em]";

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-[#0A0F14] border border-[var(--primary)]/20 p-3 rounded-lg">
                    <p className="text-[10px] uppercase font-bold text-white/40 mb-1">{label || 'Data'}</p>
                    <p className="text-sm font-black text-[var(--primary)]">${payload[0].value.toLocaleString()}</p>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="space-y-10 animate-fade-in pb-10">
            <DashboardHeader 
                title="Platform Fiscal Analysis" 
                subtitle="Real-time Revenue Audit & Growth Tracking"
                role="admin"
                Icon={FaChartLine}
                statusText="Live Intelligence"
            />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className={chartStyle}>
                    <h3 className={titleStyle}>01. Monthly Commission</h3>
                    <div className="h-[250px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={data.adminCommissionData || []}>
                                <defs>
                                    <linearGradient id="goldFill" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#D4AF37" stopOpacity={0.3}/><stop offset="95%" stopColor="#D4AF37" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <XAxis dataKey="month" stroke="#64748b" fontSize={10} axisLine={false} tickLine={false} />
                                <YAxis stroke="#64748b" fontSize={10} axisLine={false} tickLine={false} />
                                <Tooltip content={<CustomTooltip />} />
                                <Area type="monotone" dataKey="commission" stroke="#D4AF37" strokeWidth={3} fill="url(#goldFill)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className={chartStyle}>
                    <h3 className={titleStyle}>02. Gross Revenue</h3>
                    <div className="h-[250px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={data.totalRevenueData || []}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                                <XAxis dataKey="month" stroke="#64748b" fontSize={10} axisLine={false} />
                                <YAxis stroke="#64748b" fontSize={10} axisLine={false} />
                                <Tooltip content={<CustomTooltip />} />
                                <Line type="stepAfter" dataKey="total" stroke="#D4AF37" strokeWidth={4} dot={{fill: '#0A0F14', stroke: '#D4AF37', strokeWidth: 2, r: 4}} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className={chartStyle}>
                    <h3 className={titleStyle}>03. Category Share</h3>
                    <div className="h-[250px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie data={data.catChartData || []} innerRadius={60} outerRadius={85} paddingAngle={8} dataKey="value" nameKey="name">
                                    {(data.catChartData || []).map((e, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} stroke="none" />)}
                                </Pie>
                                <Tooltip content={<CustomTooltip />} />
                                <Legend iconType="circle" wrapperStyle={{fontSize: '10px', textTransform: 'uppercase'}} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className={chartStyle}>
                    <h3 className={titleStyle}>04. Top Brands</h3>
                    <div className="h-[250px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={data.brandChartData || []}>
                                <XAxis dataKey="name" stroke="#64748b" fontSize={10} axisLine={false} tickLine={false} />
                                <YAxis stroke="#64748b" fontSize={10} axisLine={false} />
                                <Tooltip content={<CustomTooltip />} cursor={{fill: '#D4AF37', opacity: 0.05}} />
                                <Bar dataKey="value" fill="#D4AF37" radius={[4, 4, 0, 0]} barSize={35} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className={`${chartStyle} lg:col-span-2`}>
                    <h3 className={titleStyle}>05. Elite Host Performance</h3>
                    <div className="h-[280px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart layout="vertical" data={data.hostChartData || []} margin={{left: 40}}>
                                <XAxis type="number" hide />
                                <YAxis dataKey="host" type="category" stroke="#64748b" fontSize={10} axisLine={false} width={100} />
                                <Tooltip content={<CustomTooltip />} cursor={{fill: '#D4AF37', opacity: 0.05}} />
                                <Bar dataKey="revenue" fill="#D4AF37" radius={[0, 4, 4, 0]} barSize={20} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RevenueAnalytics;