import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../../Hooks/useAxios";
import LoadingSpinner from "../../../Component/shared/LoadingSpinner";
import {
  FaHeadset,
  FaTrash,
  FaEnvelopeOpenText,
  FaReply,
  FaUser,
  FaClock,
} from "react-icons/fa";
import Swal from "sweetalert2";
import DashboardHeader from "../../../Component/Dashboard/Common/DashboardHeader";

const ManageContacts = () => {
  const axiosSecure = useAxios();

  const {
    data: contacts = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["admin-contacts"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/contacts");
      return res.data;
    },
  });

  const handleDelete = (id) => {
    Swal.fire({
      title: "Delete Inquiry?",
      text: "This message will be removed from records.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      background: "var(--card-bg)",
      color: "var(--text-main)",
      confirmButtonText: "Delete",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.delete(`/admin/contacts/${id}`);
        if (res.data.deletedCount > 0) {
          Swal.fire("Removed!", "Message deleted successfully.", "success");
          refetch();
        }
      }
    });
  };

  const handleReply = async (contact) => {
    const mailtoUrl = `mailto:${contact.email}?subject=Re: ${contact.subject}&body=Hello ${contact.name},%0D%0A%0D%0AThank you for reaching out to Travel Ease.%0D%0A%0D%0A`;
    window.location.href = mailtoUrl;

    await axiosSecure.patch(`/admin/contacts/replied/${contact._id}`);
    refetch();
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="space-y-10 animate-fade-in pb-10">
      <DashboardHeader
        title="Concierge Desk"
        subtitle="Manage User Inquiries and Support Requests"
        role="admin"
        Icon={FaHeadset}
        statusText={`Active: ${contacts.length} Inquiries`}
      />

      {/* Table Container */}
      <div className="bg-[var(--card-bg)] border border-[var(--primary)]/10 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="table w-full border-collapse">
            <thead className="bg-[var(--primary)]/5 text-[var(--primary)] uppercase text-[10px] tracking-[0.2em] border-b border-[var(--primary)]/10">
              <tr>
                <th className="py-6 pl-8">Sender Details</th>
                <th>Subject & Message</th>
                <th>Date</th>
                <th>Status</th>
                <th className="text-right pr-8">Management</th>
              </tr>
            </thead>
            <tbody className="text-[var(--text-main)]">
              {contacts.map((contact) => (
                <tr
                  key={contact._id}
                  className="border-b border-white/5 hover:bg-[var(--primary)]/5 transition-all group"
                >
                  {/* Sender Column */}
                  <td className="py-5 pl-8">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-lg bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)] border border-[var(--primary)]/20">
                        <FaUser size={14} />
                      </div>
                      <div>
                        <div className="font-bold uppercase tracking-wider text-xs">
                          {contact.name}
                        </div>
                        <div className="text-[9px] opacity-40 lowercase mt-0.5">
                          {contact.email}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Message Column */}
                  <td className="max-w-xs">
                    <div className="py-2">
                      <div className="text-[10px] font-bold text-[var(--primary)] uppercase mb-1 tracking-wider">
                        {contact.subject}
                      </div>
                      <p className="text-xs opacity-60 line-clamp-2 group-hover:line-clamp-none transition-all">
                        {contact.message}
                      </p>
                    </div>
                  </td>

                  {/* Date Column */}
                  <td>
                    <div className="flex items-center gap-2 opacity-50 text-[10px]">
                      <FaClock size={10} />
                      {new Date(contact.createdAt).toLocaleDateString()}
                    </div>
                  </td>

                  {/* Status Column */}
                  <td>
                    <span
                      className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${
                        contact.status === "replied"
                          ? "bg-green-500/10 text-green-500 border border-green-500/20"
                          : "bg-blue-500/10 text-blue-500 border border-blue-500/20 animate-pulse"
                      }`}
                    >
                      {contact.status}
                    </span>
                  </td>

                  {/* Actions Column */}
                  <td className="text-right pr-8">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => handleReply(contact)}
                        className="p-3 text-[var(--primary)] hover:bg-[var(--primary)]/10 rounded-xl transition-all"
                        title="Reply via Email"
                      >
                        <FaReply size={14} />
                      </button>
                      <button
                        onClick={() => handleDelete(contact._id)}
                        className="p-3 text-red-700/80 hover:text-red-600 hover:bg-red-600/10 rounded-xl transition-all"
                        title="Delete Inquiry"
                      >
                        <FaTrash size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {contacts.length === 0 && (
          <div className="text-center py-20 opacity-20">
            <FaEnvelopeOpenText size={50} className="mx-auto mb-4" />
            <p className="uppercase font-black tracking-widest text-sm">
              Inbox is empty
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageContacts;
