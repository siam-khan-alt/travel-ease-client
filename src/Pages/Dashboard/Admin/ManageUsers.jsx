import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxios from '../../../Hooks/useAxios';
import LoadingSpinner from '../../../Component/shared/LoadingSpinner';
import {  FaTrashAlt, FaBan, FaCheckCircle, FaCrown, FaUsers } from 'react-icons/fa';
import Swal from 'sweetalert2';
import DashboardHeader from '../../../Component/Dashboard/Common/DashboardHeader';

const ManageUsers = () => {
    const axiosSecure = useAxios();

    const { data: users = [], isLoading, refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data;
        }
    });

    const getSwalConfig = () => ({
        background: 'var(--card-bg)',
        color: 'var(--text-main)',
        confirmButtonColor: 'var(--primary)',
        customClass: {
            popup: 'border border-[var(--primary)]/20 rounded-2xl shadow-md',
            title: 'font-bold uppercase tracking-tighter',
        }
    });

    const handleUpdateRole = async (user, newRole) => {
        const res = await axiosSecure.patch(`/users/update-role/${user._id}`, { role: newRole });
        if (res.data.modifiedCount > 0) {
            refetch();
            Swal.fire({ ...getSwalConfig(), title: "Access Updated", text: `${user.name} is now ${newRole}`, icon: "success" });
        }
    };

    const handleStatusChange = async (user) => {
        const newStatus = user.status === 'banned' ? 'active' : 'banned';
        const res = await axiosSecure.patch(`/users/status/${user._id}`, { status: newStatus });
        if (res.data.modifiedCount > 0) {
            refetch();
            Swal.fire({ ...getSwalConfig(), title: "Security Alert", text: `User status: ${newStatus}`, icon: "success" });
        }
    };

    const handleDeleteUser = (user) => {
        Swal.fire({
            ...getSwalConfig(),
            title: "Terminate User?",
            text: "This operation cannot be undone.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Confirm Delete"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axiosSecure.delete(`/users/${user._id}`);
                if (res.data.deletedCount > 0) {
                    refetch();
                    Swal.fire({ ...getSwalConfig(), title: "User Purged", icon: "success" });
                }
            }
        });
    };

    if (isLoading) return <LoadingSpinner />;

    return (
        <div className="space-y-10 animate-fade-in pb-10">
            <DashboardHeader 
                title="Global User Control" 
                subtitle="Personnel Management & Authority Levels"
                role="admin"
                Icon={FaUsers}
                statusText="Authentication Protocol Active"
            />

            {/* User Table Card */}
            <div className="bg-[var(--card-bg)] border border-[var(--primary)]/10 rounded-2xl shadow-sm overflow-hidden transition-all">
                <div className="overflow-x-auto">
                    <table className="table w-full">
                        <thead className="bg-[var(--primary)]/5 text-[var(--primary)] uppercase text-[10px] tracking-[0.2em] border-b border-[var(--primary)]/10">
                            <tr>
                                <th className="py-6 pl-8">Identity</th>
                                <th>Access Level</th>
                                <th className="text-center">Modify Authority</th>
                                <th className="text-right pr-8">Security Actions</th>
                            </tr>
                        </thead>
                        <tbody className="text-[var(--text-main)]">
                            {users.map((user) => (
                                <tr key={user._id} className="border-b border-white/5 hover:bg-[var(--primary)]/5 transition-all group">
                                    <td className="py-5 pl-8">
                                        <div className="flex items-center gap-4">
                                            <div className={`avatar ${user.status === 'banned' ? 'grayscale opacity-30' : ''}`}>
                                                <div className="mask mask-squircle h-11 w-11 border border-[var(--primary)]/20 group-hover:border-[var(--primary)]/50 transition-all">
                                                    <img src={user.photo} alt="" />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold uppercase tracking-wider text-xs">{user.name}</div>
                                                <div className="text-[10px] opacity-30 font-mono">{user.email}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <span className={`px-3 py-1 text-[9px] font-black uppercase rounded shadow-sm border ${user.role === 'admin' ? 'border-red-500/20 text-red-500 bg-red-500/5' : 'border-[var(--primary)]/20 text-[var(--primary)] bg-[var(--primary)]/5'}`}>
                                            {user.role}
                                        </span>
                                    </td>
                                    <td className="text-center">
                                        <div className="flex justify-center gap-2">
                                            {user.role !== 'admin' && (
                                                <button onClick={() => handleUpdateRole(user, 'admin')} className="btn btn-xs btn-outline border-[var(--primary)]/30 text-[var(--primary)] rounded-lg hover:bg-[var(--primary)] hover:text-black transition-all">
                                                    Admin
                                                </button>
                                            )}
                                            {user.role !== 'host' && (
                                                <button onClick={() => handleUpdateRole(user, 'host')} className="btn btn-xs btn-outline border-[var(--primary)]/30 text-[var(--primary)] rounded-lg hover:bg-[var(--primary)] hover:text-black transition-all">
                                                    Host
                                                </button>
                                            )}
                                            {user.role !== 'user' && (
                                                <button onClick={() => handleUpdateRole(user, 'user')} className="text-[10px] opacity-30 hover:opacity-100 hover:text-red-500 uppercase font-black transition-all px-2">
                                                    Demote
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                    <td className="text-right pr-8">
                                        <div className="flex justify-end gap-5">
                                            <button 
                                                onClick={() => handleStatusChange(user)} 
                                                className={`text-lg transition-all ${user.status === 'banned' ? 'text-green-500' : 'text-orange-500'} hover:scale-125`}
                                                title={user.status === 'banned' ? 'Activate' : 'Suspend'}
                                            >
                                                {user.status === 'banned' ? <FaCheckCircle /> : <FaBan />}
                                            </button>
                                            <button 
                                                onClick={() => handleDeleteUser(user)} 
                                                className="text-lg text-red-700 hover:text-red-600 transition-all hover:scale-125"
                                                title="Delete Account"
                                            >
                                                <FaTrashAlt />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ManageUsers;