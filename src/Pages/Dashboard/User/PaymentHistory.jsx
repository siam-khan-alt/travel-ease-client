import React, { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../../Context/AuthContext";
import useAxios from "../../../Hooks/useAxios";
import LoadingSpinner from "../../../Component/shared/LoadingSpinner";
import {
  FaFingerprint,
  FaCheckDouble,
  FaExternalLinkAlt,
  FaHistory,
} from "react-icons/fa";
import DashboardHeader from "../../../Component/Dashboard/Common/DashboardHeader";

const PaymentHistory = () => {
  const { users } = useContext(AuthContext);
  const axiosSecure = useAxios();

  const { data: payments = [], isLoading } = useQuery({
    queryKey: ["payment-history", users?.email],
    enabled: !!users?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments/${users?.email}`);
      return res.data;
    },
  });

  if (isLoading) return <LoadingSpinner minHeight="60vh" />;

  return (
    <div className="space-y-8 animate-fade-in pb-10">
      <DashboardHeader 
        title="Payment Ledger" 
        subtitle="Verified Transactions & Encrypted Logs"
        role="user"
        Icon={FaHistory}
        statusText="Financial Sync Active"
      />

      {/* History Grid/Table */}
      <div className="bg-[var(--card-bg)] border border-[var(--primary)]/10 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          {payments.length > 0 ? (
            <table className="table w-full border-collapse">
              <thead>
                <tr className="bg-[var(--primary)]/5 border-b border-[var(--primary)]/10 text-[var(--primary)] uppercase text-[10px] tracking-[0.2em]">
                  <th className="py-5 px-6 font-black text-left">Asset</th>
                  <th className="py-5 px-6 font-black text-left">
                    Transaction Hash
                  </th>
                  <th className="py-5 px-6 font-black text-left">Amount</th>
                  <th className="py-5 px-6 font-black text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--primary)]/5">
                {payments.map((payment) => (
                  <tr
                    key={payment._id}
                    className="hover:bg-[var(--primary)]/5 transition-all duration-300"
                  >
                    {/* Vehicle info from bookingDetails */}
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded bg-[var(--primary)]/10 border border-[var(--primary)]/20 overflow-hidden">
                          <img
                            src={
                              payment.bookingDetails?.image ||
                              payment.bookingDetails?.coverImage
                            }
                            alt=""
                            className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all"
                          />
                        </div>
                        <p className="font-bold text-xs uppercase tracking-wide text-[var(--text-main)]">
                          {payment.bookingDetails?.vehicleName}
                        </p>
                      </div>
                    </td>

                    {/* Transaction ID */}
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2 font-mono text-[10px] text-[var(--primary)] bg-[var(--primary)]/5 px-3 py-1.5 rounded-md border border-[var(--primary)]/5 w-fit">
                        <FaFingerprint className="opacity-40" />
                        {payment.transactionId}
                      </div>
                    </td>

                    {/* Price */}
                    <td className="px-6 py-5">
                      <p className="font-bold text-[var(--text-main)] text-sm">
                        ${payment.bookingDetails?.price}
                      </p>
                    </td>

                    {/* Status */}
                    <td className="px-6 py-5 text-center">
                      <div className="flex items-center justify-center gap-1.5 text-[10px] font-black text-green-500 uppercase tracking-widest">
                        <FaCheckDouble size={10} />
                        Success
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="py-20 text-center opacity-20 uppercase text-xs font-bold tracking-[0.5em]">
              No secure logs found
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentHistory;
