import React, { useContext, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { FaEnvelope, FaCalendarAlt, FaIdBadge, FaShieldAlt, FaUserEdit, FaCamera, FaUser, FaGem } from "react-icons/fa";
import useAxios from "../../Hooks/useAxios";
import Swal from "sweetalert2";

const Profile = () => {
  const { users, profileUpdate, setUser } = useContext(AuthContext);
  const axiosPublic = useAxios();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const photo = e.target.photo.value;

    try {
      await profileUpdate(name, photo);
      const res = await axiosPublic.patch(`/users/${users?.email}`, { name, photo });

      if (res.data.modifiedCount > 0 || res.data.matchedCount > 0) {
        setUser({ ...users, displayName: name, photoURL: photo });
        setIsModalOpen(false);
        Swal.fire({
          title: "SUCCESS",
          text: "IDENTITY UPDATED",
          icon: "success",
          background: "var(--card-bg)",
          color: "var(--text-main)",
          confirmButtonColor: "var(--primary)",
        });
      }
    } catch (err) {
      Swal.fire("Error", err.message, "error");
    }
  };

  return (
    <div className="w-full ">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Side: Avatar & Basic Info */}
        <div className="lg:col-span-4 space-y-6">
          <div className="car-card p-8 text-center flex flex-col items-center rounded-2xl border-b-4 border-b-[var(--primary)]">
            <div className="relative mb-6">
              <div className="w-40 h-40 rounded-full border-2 border-[var(--primary)] p-1 gold-glow overflow-hidden">
                <img
                  src={users?.photoURL || "https://i.ibb.co/0n6CkP9/user.png"}
                  alt="Profile"
                  className="w-full h-full rounded-full object-cover bg-[var(--bg-main)]"
                />
              </div>
              <div className="absolute bottom-2 right-2 bg-[var(--primary)] p-2 rounded-full text-[#0A0F14]">
                <FaGem size={14} />
              </div>
            </div>
            
            <h2 className="text-2xl font-black uppercase tracking-tighter text-[var(--text-main)] mb-1">
              {users?.displayName || "Guest Explorer"}
            </h2>
            <p className="text-[var(--primary)] text-[10px] font-bold uppercase tracking-[0.4em] mb-6">
              {users?.role || "Verified User"}
            </p>
            
            <button onClick={() => setIsModalOpen(true)} className="btn-gradient w-full text-xs">
              Update Identity
            </button>
          </div>

          <div className="car-card p-6 bg-[var(--card-bg)] border-l-4 rounded-2xl border-l-[var(--primary)] overflow-hidden relative group">
             <div className="relative z-10">
                <p className="text-[var(--primary)] text-[10px] font-black uppercase tracking-widest mb-2">Member Security</p>
                <h4 className="text-xl font-bold uppercase tracking-tighter mb-4 text-[var(--text-main)]">Elite Status Active</h4>
                <div className="flex items-center gap-2 text-xs text-gray-400 font-medium">
                   <FaShieldAlt className="text-[var(--primary)]" /> Authorized Personnel Only
                </div>
             </div>
             <FaShieldAlt className="absolute -right-4 -bottom-4 text-[var(--primary)] opacity-5 group-hover:opacity-10 transition-opacity duration-700" size={120} />
          </div>
        </div>

        {/* Right Side: Detailed Info */}
        <div className="lg:col-span-8 space-y-6">
          <div className="car-card rounded-2xl p-1">
             <div className="bg-[var(--card-bg)] p-8">
                <h3 className="text-xl font-black uppercase tracking-widest text-[var(--text-main)] mb-8 border-l-4 border-[var(--primary)] pl-4">
                  Account Credentials
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-1">
                    <span className="flex items-center gap-2 text-[10px] font-black text-gray-500 uppercase tracking-widest">
                      <FaEnvelope className="text-[var(--primary)]" /> Registered Email
                    </span>
                    <p className="text-lg font-bold text-[var(--text-main)] break-all">{users?.email}</p>
                  </div>

                  <div className="space-y-1">
                    <span className="flex items-center gap-2 text-[10px] font-black text-gray-500 uppercase tracking-widest">
                      <FaIdBadge className="text-[var(--primary)]" /> Secure UID
                    </span>
                    <p className="text-sm font-mono font-bold text-[var(--text-main)] opacity-70">{users?.uid}</p>
                  </div>

                  <div className="space-y-1 md:col-span-2">
                    <span className="flex items-center gap-2 text-[10px] font-black text-gray-500 uppercase tracking-widest">
                      <FaCalendarAlt className="text-[var(--primary)]" /> System Access Log
                    </span>
                    <p className="text-lg font-bold text-[var(--text-main)] uppercase tracking-tighter">
                      {users?.metadata?.lastSignInTime
                        ? new Date(users.metadata.lastSignInTime).toLocaleString("en-GB", {
                            day: "numeric", month: "long", year: "numeric", hour: '2-digit', minute: '2-digit'
                          })
                        : "Session Active"}
                    </p>
                  </div>
                </div>
             </div>
          </div>

          {/* Responsive Luxury Banner Stat */}
          <div className="car-card h-40 flex items-center justify-between px-10 relative overflow-hidden bg-[var(--card-bg)] rounded-2xl border-r-4 border-r-[var(--primary)]">
              {/* Soft background glow for light mode */}
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-[var(--primary)]/5 to-transparent"></div>
              
              <div className="z-10">
                 <h2 className="text-4xl font-black text-gradient-gold tracking-tighter">TravelEase</h2>
                 <p className="text-[10px] text-gray-400 uppercase font-black tracking-[0.5em] mt-2">Premium Asset Management</p>
              </div>
              
              <div className="hidden md:block w-px h-16 bg-[var(--primary)]/20"></div>
              
              <div className="hidden md:flex flex-col items-end z-10">
                  <span className="text-[var(--primary)] font-black text-3xl uppercase tracking-tighter">Verified</span>
                  <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Account Integrity</span>
              </div>
          </div>
        </div>

      </div>

      {/* --- Unique Minimalist Modal --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
          <div className="bg-[var(--card-bg)] w-full max-w-lg border-2 border-[var(--primary)] p-0 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
            <div className="bg-[var(--primary)] p-4 text-center">
               <h3 className="text-lg font-black uppercase tracking-[0.3em] text-[#0A0F14]">
                 Modify Persona
               </h3>
            </div>
            
            <form onSubmit={handleUpdate} className="p-8 space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest">Identification Name</label>
                <div className="relative">
                  <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--primary)]" />
                  <input
                    name="name"
                    type="text"
                    defaultValue={users?.displayName}
                    className="w-full pl-12 pr-4 py-4 bg-[var(--bg-main)] border-none focus:ring-1 focus:ring-[var(--primary)] outline-none font-bold text-[var(--text-main)] transition-all"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Visual Asset URL</label>
                <div className="relative">
                  <FaCamera className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--primary)]" />
                  <input
                    name="photo"
                    type="url"
                    defaultValue={users?.photoURL}
                    className="w-full pl-12 pr-4 py-4 bg-[var(--bg-main)] border-none focus:ring-1 focus:ring-[var(--primary)] outline-none font-bold text-[var(--text-main)] transition-all"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4">
                <button type="submit" className="btn-gradient py-4 text-xs font-black">
                  Authorize
                </button>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="py-4 text-xs font-black uppercase tracking-widest border border-[var(--primary)]/30 text-[var(--text-main)] hover:bg-[var(--primary)]/5 transition-all"
                >
                  Abort
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;