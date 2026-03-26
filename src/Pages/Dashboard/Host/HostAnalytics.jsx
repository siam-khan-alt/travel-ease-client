import React, { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, AreaChart, Area, Legend 
} from 'recharts';
import useAxios from '../../../Hooks/useAxios';
import { AuthContext } from '../../../Context/AuthContext';
import LoadingSpinner from '../../../Component/shared/LoadingSpinner';

const COLORS = ['#D4AF37', '#C5A059', '#F2CC8F', '#B8860B', '#DAA520'];

const HostAnalytics = () => {
    const { users } = useContext(AuthContext);
    const axiosSecure = useAxios();

    const { data, isLoading } = useQuery({
        queryKey: ['host-analytics', users?.email],
        enabled: !!users?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/host-analytics/${users?.email}`);
            return res.data;
        }
    });

    if (isLoading) return <LoadingSpinner />;

    const chartTextColor = "var(--text-main)";
    const chartGridColor = "rgba(197, 160, 89, 0.1)"; // Primary gold with low opacity

    return (
        <div className=" space-y-10 min-h-screen">
            <div>
                <h2 className="text-3xl !text-center md:!text-left uppercase tracking-tighter text-gradient-gold">
                    Fleet Intelligence
                </h2>
                <p className="text-[var(--text-main)]/40 text-xs font-bold tracking-[0.3em] uppercase !text-center md:!text-left">
                    Revenue Flow & Asset Performance
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                
                {/* ১. Category-wise Price (Pie Chart) */}
                <div className="bg-[var(--card-bg)] p-6 rounded-2xl border border-[var(--primary)]/10 shadow-md car-card">
                    <h3 className="text-[var(--primary)] text-sm font-black uppercase mb-6 tracking-widest">Category Distribution</h3>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie 
                                    data={data?.categoryChartData} 
                                    innerRadius={70} 
                                    outerRadius={90} 
                                    paddingAngle={5} 
                                    dataKey="value"
                                    label
                                >
                                    {data?.categoryChartData?.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="none" />
                                    ))}
                                </Pie>
                                <Tooltip 
                                    contentStyle={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--primary)', borderRadius: '0px' }}
                                    itemStyle={{ color: 'var(--text-main)' }}
                                />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* ২. Vehicle per Piece Revenue (Bar Chart) */}
                <div className="bg-[var(--card-bg)] p-6 rounded-2xl border border-[var(--primary)]/10 shadow-md car-card">
                    <h3 className="text-[var(--primary)] text-sm font-black uppercase mb-6 tracking-widest">Revenue Per Vehicle</h3>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={data?.vehicleChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke={chartGridColor} vertical={false} />
                                <XAxis dataKey="name" stroke={chartTextColor} fontSize={10} tickLine={false} axisLine={false} />
                                <YAxis stroke={chartTextColor} fontSize={10} tickLine={false} axisLine={false} />
                                <Tooltip 
                                    cursor={{fill: 'rgba(197, 160, 89, 0.05)'}}
                                    contentStyle={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--primary)', borderRadius: '0px' }}
                                />
                                <Bar dataKey="value" fill="var(--primary)" radius={[2, 2, 0, 0]} barSize={30} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* ৩. Monthly Revenue (Area Chart) */}
                <div className="bg-[var(--card-bg)] p-8 rounded-2xl border border-[var(--primary)]/10 shadow-md lg:col-span-2 car-card">
                    <h3 className="text-[var(--primary)] text-sm font-black uppercase mb-6 tracking-widest text-center">Monthly Revenue Stream</h3>
                    <div className="h-[350px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={data?.monthlyChartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.3}/>
                                        <stop offset="95%" stopColor="var(--primary)" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke={chartGridColor} />
                                <XAxis dataKey="name" stroke={chartTextColor} fontSize={12} tickLine={false} />
                                <YAxis stroke={chartTextColor} fontSize={12} tickLine={false} />
                                <Tooltip 
                                    contentStyle={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--primary)', borderRadius: '0px' }}
                                />
                                <Area 
                                    type="monotone" 
                                    dataKey="revenue" 
                                    stroke="var(--primary)" 
                                    fillOpacity={1} 
                                    fill="url(#colorRev)" 
                                    strokeWidth={3}
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default HostAnalytics;