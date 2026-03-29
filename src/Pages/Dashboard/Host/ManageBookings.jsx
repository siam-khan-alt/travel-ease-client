import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import { FaCheck, FaTimes, FaCar, FaUserAlt, FaTasks } from "react-icons/fa";
import Swal from "sweetalert2";
import { AuthContext } from "../../../Context/AuthContext";
import useAxios from "../../../Hooks/useAxios";
import LoadingSpinner from "../../../Component/shared/LoadingSpinner";
import { format } from "date-fns";
import DashboardHeader from "../../../Component/Dashboard/Common/DashboardHeader";

const ManageBookings = () => {
  const { users } = useContext(AuthContext);
  const instanceAxios = useAxios();
  const queryClient = useQueryClient();

  const { data: requests = [], isLoading } = useQuery({
    queryKey: ["host-requests", users?.email],
    enabled: !!users?.email,
    queryFn: async () => {
      const res = await instanceAxios.get(`/bookings/host/${users?.email}`);
      return res.data;
    },
  });

  const acceptMutation = useMutation({
    mutationFn: async (id) => {
      const res = await instanceAxios.patch(`/bookings/accept/${id}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["host-requests"]);
      Swal.fire({
        title: "Approved!",
        text: "User has been notified to complete payment.",
        icon: "success",
        background: "var(--card-bg)",
        color: "var(--text-main)",
        confirmButtonColor: "var(--primary)",
      });
    },
  });
  const safeFormat = (dateString, formatStr) => {
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        return "N/A";
      }
      return format(date, formatStr);
    } catch (error) {
      return "N/A";
    }
  };
  if (isLoading) return <LoadingSpinner />;

  return (
    <div className=" bg-[var(--bg-main)] min-h-screen">
      <div>
        <DashboardHeader
          title="Rental Requests"
          subtitle="Manage incoming vehicle bookings and deployments"
          role="host"
          Icon={FaTasks}
          statusText="Awaiting Clearance"
        />

        {/* Table Container */}
        <div className="bg-[var(--card-bg)] border border-[var(--primary)]/10 rounded-2xl overflow-hidden shadow-md">
          <div className="overflow-x-auto">
            {requests.length > 0 ? (
              <table className="table w-full border-collapse">
                <thead>
                  <tr className="bg-[var(--primary)]/5 border-b border-[var(--primary)]/10 text-[var(--primary)] uppercase text-[10px] tracking-[0.2em]">
                    <th className="py-5 px-6 font-black text-left">Vehicle</th>
                    <th className="py-5 px-6 font-black text-left">Customer</th>
                    <th className="py-5 px-6">Duration (Dates)</th>
                    <th className="py-5 px-6 font-black text-left">Revenue</th>
                    <th className="py-5 px-6 font-black text-center">
                      Security Status
                    </th>
                    <th className="py-5 px-6 font-black text-center">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--primary)]/5">
                  {requests.map((request) => (
                    <tr
                      key={request._id}
                      className="hover:bg-[var(--primary)]/5 transition-all"
                    >
                      {/* Vehicle Info */}
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)]">
                            <FaCar />
                          </div>
                          <div>
                            <p className="font-bold text-[var(--text-main)] uppercase text-xs tracking-wide">
                              {request.vehicleName}
                            </p>
                            <p className="text-[9px] opacity-40 font-mono">
                              ID: {request.vehicleId?.slice(-6)}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* User Info */}
                      <td className="px-6 py-5">
                        <div className="flex flex-col">
                          <span className="text-xs font-bold text-[var(--text-main)]">
                            {request.userName}
                          </span>
                          <span className="text-[10px] opacity-40">
                            {request.userEmail}
                          </span>
                        </div>
                      </td>

                      {/* Price */}
                      <td className="px-6 py-5">
                        <p className="font-black text-[var(--primary)] text-sm">
                          ${request.totalPrice}
                        </p>
                      </td>
                      {/* Dates */}
                      <td className="px-6 py-5">
                        <div className="flex flex-col text-[10px]">
                          <span className="font-bold text-[var(--text-main)]">
                            {safeFormat(request.startDate, "MMM dd")} -{" "}
                            {safeFormat(request.endDate, "MMM dd, yyyy")}
                          </span>
                          <span className="opacity-50 ">
                            {request.totalDays} Rental Days
                          </span>
                        </div>
                      </td>

                      {/* Status */}
                      <td className="px-6 py-5 text-center">
                        <span
                          className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${
                            request.status === "Pending"
                              ? "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
                              : request.status === "Accepted"
                              ? "bg-blue-500/10 text-blue-400 border-blue-500/20"
                              : "bg-green-500/10 text-green-400 border-green-500/20"
                          }`}
                        >
                          {request.status}
                        </span>
                      </td>

                      {/* Buttons */}
                      <td className="px-6 py-5">
                        <div className="flex justify-center gap-2">
                          {request.status === "Pending" ? (
                            <>
                              <button
                                onClick={() =>
                                  acceptMutation.mutate(request._id)
                                }
                                className="p-2 bg-[var(--primary)] text-black rounded-lg hover:scale-110 transition-all shadow-lg"
                                title="Accept Request"
                              >
                                <FaCheck size={12} />
                              </button>
                              <button
                                className="p-2 bg-red-500/20 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-all border border-red-500/30"
                                title="Reject Request"
                              >
                                <FaTimes size={12} />
                              </button>
                            </>
                          ) : (
                            <span className="text-[10px] opacity-20 uppercase font-bold italic tracking-tighter">
                              No Actions Left
                            </span>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="py-20 text-center space-y-4">
                <p className="text-[var(--text-main)]/30 uppercase text-xs font-bold tracking-[0.5em]">
                  No Requests Found
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageBookings;
