import React, { useContext, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { FaEnvelope, FaCalendarAlt, FaIdBadge, FaShieldAlt, FaUserEdit, FaCamera, FaUser } from "react-icons/fa";
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

      const res = await axiosPublic.patch(`/users/${users?.email}`, {
        name,
        photo,
      });

      if (res.data.modifiedCount > 0 || res.data.matchedCount > 0) {
        setUser({ ...users, displayName: name, photoURL: photo });
        setIsModalOpen(false);
        Swal.fire({
          title: "Success!",
          text: "Profile Updated Successfully",
          icon: "success",
          confirmButtonColor: "#E07A5F",
        });
      }
    } catch (err) {
      Swal.fire("Error", err.message, "error");
    }
  };

  return (
    <div className="w-full">
      <div className="bg-white dark:bg-[#1E293B] rounded-3xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-800">
        <div className="h-40 md:h-48 bg-gradient-to-r from-[#E07A5F] to-[#F2CC8F] relative">
          <div className="absolute -bottom-16 left-6 md:left-12">
            <img
              src={users?.photoURL || "https://i.ibb.co/0n6CkP9/user.png"}
              alt="Profile"
              className="w-28 h-28 md:w-40 md:h-40 rounded-3xl border-4 md:border-8 border-white dark:border-[#1E293B] shadow-2xl object-cover bg-white"
            />
          </div>
        </div>

        <div className="px-6 md:px-12 pt-20 pb-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
            <div className="max-w-full">
              <h2 className="text-2xl md:text-4xl font-black text-[#3D405B] dark:text-white mb-2 break-words">
                {users?.displayName || "Guest User"}
              </h2>
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 bg-[#E07A5F20] text-[#E07A5F] text-[10px] font-black uppercase tracking-tighter rounded-full flex items-center gap-1">
                  <FaShieldAlt size={10} /> Verified Member
                </span>
                <span className="text-gray-400 text-xs md:text-sm font-medium">| TravelEase Explorer</span>
              </div>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="w-full md:w-auto bg-[#3D405B] dark:bg-[#E07A5F] hover:opacity-90 text-white px-6 py-3 rounded-2xl flex items-center justify-center gap-2 transition-all font-bold shadow-lg"
            >
              <FaUserEdit /> Update Profile
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="text-lg font-bold text-[#3D405B] dark:text-white mb-2">Personal Information</h4>
              <div className="flex items-start gap-4 p-5 bg-[#F4F1DE]/50 dark:bg-[#0F172A] rounded-2xl border border-transparent hover:border-[#E07A5F]/30 transition-all">
                <div className="p-3 bg-white dark:bg-[#1E293B] text-[#E07A5F] rounded-xl shadow-sm shrink-0">
                  <FaEnvelope size={18} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mb-1">Email Address</p>
                  <p className="text-[#3D405B] dark:text-gray-200 font-bold text-sm md:text-lg break-all">
                    {users?.email}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-5 bg-[#F4F1DE]/50 dark:bg-[#0F172A] rounded-2xl border border-transparent hover:border-[#E07A5F]/30 transition-all">
                <div className="p-3 bg-white dark:bg-[#1E293B] text-[#E07A5F] rounded-xl shadow-sm shrink-0">
                  <FaIdBadge size={18} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mb-1">User Unique ID</p>
                  <p className="text-[#3D405B] dark:text-gray-200 font-mono text-xs md:text-sm break-all leading-relaxed">
                    {users?.uid}
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-lg font-bold text-[#3D405B] dark:text-white mb-2">Activity Log</h4>
              <div className="flex items-start gap-4 p-5 bg-[#F4F1DE]/50 dark:bg-[#0F172A] rounded-2xl border border-transparent hover:border-[#E07A5F]/30 transition-all">
                <div className="p-3 bg-white dark:bg-[#1E293B] text-[#E07A5F] rounded-xl shadow-sm shrink-0">
                  <FaCalendarAlt size={18} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mb-1">Last Login</p>
                  <p className="text-[#3D405B] dark:text-gray-200 font-bold text-sm md:text-lg">
                    {users?.metadata?.lastSignInTime
                      ? new Date(users.metadata.lastSignInTime).toLocaleDateString("en-GB", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })
                      : "Recently Active"}
                  </p>
                </div>
              </div>

              <div className="p-6 md:p-8 bg-[#3D405B] rounded-3xl text-white relative overflow-hidden group">
                <div className="relative z-10">
                  <h5 className="font-bold text-lg md:text-xl mb-1 text-[#F2CC8F]">Account Status</h5>
                  <p className="text-gray-400 text-xs md:text-sm leading-relaxed">
                    Your account is active. All car listings and bookings are secured in our database.
                  </p>
                </div>
                <FaShieldAlt
                  className="absolute -right-4 -bottom-4 text-white/5 group-hover:scale-110 transition-transform"
                  size={100}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-[#1E293B] w-full max-w-md rounded-[2rem] p-6 md:p-8 shadow-2xl border border-gray-100 dark:border-gray-800">
            <h3 className="text-xl md:text-2xl font-black text-[#3D405B] dark:text-white mb-6">Update Profile</h3>
            <form onSubmit={handleUpdate} className="space-y-5">
              <div>
                <label className="text-[10px] font-black uppercase text-gray-400 ml-1">Full Name</label>
                <div className="relative mt-1">
                  <FaUser className="absolute left-4 top-4 text-gray-400" />
                  <input
                    name="name"
                    type="text"
                    defaultValue={users?.displayName}
                    className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-[#0F172A] border-none rounded-2xl focus:ring-2 focus:ring-[#E07A5F] dark:text-white outline-none text-sm"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="text-[10px] font-black uppercase text-gray-400 ml-1">Photo URL</label>
                <div className="relative mt-1">
                  <FaCamera className="absolute left-4 top-4 text-gray-400" />
                  <input
                    name="photo"
                    type="url"
                    defaultValue={users?.photoURL}
                    className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-[#0F172A] border-none rounded-2xl focus:ring-2 focus:ring-[#E07A5F] dark:text-white outline-none text-sm"
                    required
                  />
                </div>
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-3 rounded-2xl font-bold bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 text-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 rounded-2xl font-bold bg-[#E07A5F] text-white hover:bg-[#d16b50] shadow-lg text-sm transition-all"
                >
                  Save Changes
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