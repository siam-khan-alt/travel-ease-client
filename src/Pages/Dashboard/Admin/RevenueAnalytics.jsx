import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { 
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
    PieChart, Pie, Cell, AreaChart, Area, Legend, LineChart, Line 
} from 'recharts';
import useAxios from '../../../Hooks/useAxios';
import LoadingSpinner from '../../../Component/shared/LoadingSpinner';

const COLORS = ['#D4AF37', '#C5A059', '#F2CC8F', '#B8860B', '#DAA520', '#8B4513'];

const RevenueAnalytics = () => {
    const axiosSecure = useAxios();

    const { data, isLoading } = useQuery({
        queryKey: ['admin-revenue'],
        queryFn: async () => {
            const res = await axiosSecure.get('/admin-revenue-analytics');
            return res.data;
        }
    });

    if (isLoading) return <LoadingSpinner />;

    const chartStyle = "bg-[var(--card-bg)] p-6 rounded-2xl border border-[var(--primary)]/10 shadow-md car-card";
    const titleStyle = "text-[var(--primary)] text-[10px] font-black uppercase mb-6 tracking-[0.2em]";

    return (
        <div className="space-y-10">
            <div>
                <h1 className="text-3xl font-black uppercase !text-center md:!text-left tracking-tighter text-gradient-gold">Platform Fiscal Analysis</h1>
                <p className="text-[var(--text-main)]/40 text-xs font-bold tracking-[0.3em] uppercase">Global Revenue Flow & Commission Reports</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                
                {/* ১. Admin Commission (Area Chart) */}
                <div className={chartStyle}>
                    <h3 className={titleStyle}>1. Monthly Admin Commission (10%)</h3>
                    <div className="h-[250px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={data?.adminCommissionData}>
                                <defs>
                                    <linearGradient id="commColor" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#D4AF37" stopOpacity={0.8}/>
                                        <stop offset="95%" stopColor="#D4AF37" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <XAxis dataKey="month" stroke="gray" fontSize={10} />
                                <YAxis stroke="gray" fontSize={10} />
                                <Tooltip contentStyle={{backgroundColor: '#111', border: '1px solid #D4AF37'}} />
                                <Area type="monotone" dataKey="commission" stroke="#D4AF37" fillOpacity={1} fill="url(#commColor)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* ২. Total Platform Revenue (Line Chart) */}
                <div className={chartStyle}>
                    <h3 className={titleStyle}>2. Total Monthly Gross Revenue</h3>
                    <div className="h-[250px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={data?.totalRevenueData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" />
                                <XAxis dataKey="month" stroke="gray" fontSize={10} />
                                <YAxis stroke="gray" fontSize={10} />
                                <Tooltip contentStyle={{backgroundColor: '#111'}}/>
                                <Line type="step" dataKey="total" stroke="#D4AF37" strokeWidth={3} dot={{r: 6}} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* ৩. Category Revenue (Pie Chart) */}
                <div className={chartStyle}>
                    <h3 className={titleStyle}>3. Category Performance</h3>
                    <div className="h-[250px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie data={data?.catChartData} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                                    {data?.catChartData?.map((e, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* ৪. Brand Wise Revenue (Bar Chart) */}
                <div className={chartStyle}>
                    <h3 className={titleStyle}>4. Top Performing Brands</h3>
                    <div className="h-[250px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={data?.brandChartData}>
                                <XAxis dataKey="name" stroke="gray" fontSize={10} />
                                <YAxis stroke="gray" fontSize={10} />
                                <Tooltip contentStyle={{backgroundColor: '#111'}} />
                                <Bar dataKey="value" fill="#D4AF37" radius={[5, 5, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* ৫. Host Performance (Horizontal Bar Chart) */}
                <div className={`${chartStyle} lg:col-span-2`}>
                    <h3 className={titleStyle}>5. Host Lifetime Contribution</h3>
                    <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart layout="vertical" data={data?.hostChartData} margin={{left: 40}}>
                                <XAxis type="number" stroke="gray" hide />
                                <YAxis dataKey="host" type="category" stroke="gray" fontSize={10} />
                                <Tooltip cursor={{fill: 'transparent'}} />
                                <Bar dataKey="revenue" fill="#D4AF37" radius={[0, 5, 5, 0]} barSize={20} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default RevenueAnalytics;