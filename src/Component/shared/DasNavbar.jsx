import React, { useContext } from "react";
import { FaBars, FaSignOutAlt, FaUserCircle, FaBell } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
import Swal from "sweetalert2";
import useAxios from "../../Hooks/useAxios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const DasNavbar = ({ theme, handletheme }) => {
  const { users, Logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const instanceAxios = useAxios();
  const queryClient = useQueryClient();

  const { data: notifications = [] } = useQuery({
    queryKey: ['notifications', users?.email],
    enabled: !!users?.email,
    queryFn: async () => {
      const res = await instanceAxios.get(`/notifications/${users?.email}`);
      return res.data;
    },
    refetchInterval: 5000, 
  });

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const markAsRead = useMutation({
    mutationFn: async (id) => {
      return await instanceAxios.patch(`/notifications/read/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['notifications']);
    }
  });

  // Dynamic SweetAlert Style based on theme
  const getSwalStyle = () => {
    return {
      background: theme === "dark" ? "#111827" : "#FFFFFF",
      color: theme === "dark" ? "#F1F5F9" : "#0F172A",
      confirmButtonColor: "#D4AF37",
      cancelButtonColor: theme === "dark" ? "#1E293B" : "#E2E8F0",
    };
  };

  const handleLogout = () => {
    Swal.fire({
      title: "Logout Elite?",
      text: "You will need to re-authenticate to access the fleet.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Terminate Session",
      cancelButtonText: "Stay Logged In",
      ...getSwalStyle(),
    }).then((result) => {
      if (result.isConfirmed) {
        Logout()
          .then(() => {
            Swal.fire({
              title: "Session Terminated",
              text: "Redirecting to main terminal...",
              icon: "success",
              timer: 1500,
              showConfirmButton: false,
              ...getSwalStyle(),
            });
            navigate("/");
          })
          .catch((err) => {
            Swal.fire({
              icon: "error",
              title: "Logout Error",
              text: err.message,
              ...getSwalStyle(),
            });
          });
      }
    });
  };

  return (
    <header className="h-20 bg-[var(--bg-main)] shadow-sm flex items-center justify-between px-6 md:px-10 border-b border-[var(--primary)]/10 sticky top-0 z-50 backdrop-blur-md bg-opacity-80">
      
      {/*  Mobile Menu Trigger */}
      <div className="lg:hidden flex items-center gap-4">
        <label htmlFor="dashboard-drawer" className="p-2 text-[var(--text-main)] cursor-pointer">
          <FaBars size={22} />
        </label>
        <Link to="/" className="text-xl font-black uppercase tracking-tighter block md:hidden">
          <span className="text-gradient-gold">TE</span>
        </Link>
      </div>

      {/*  Context Title */}
      <div className="hidden md:block">
        <h2 className="text-lg !text-left text-gradient-gold">
          Executive Terminal
        </h2>
        <p className="text-sm font-bold text-[var(--primary)]">Fleet Management</p>
      </div>

      {/*  Actions Section */}
      <div className="flex items-center gap-3 md:gap-6">
        
        {/*  Theme Toggle */}
        <label className="swap swap-rotate text-[var(--primary)] hover:scale-110 transition-transform">
          <input 
            type="checkbox" 
            onChange={(e) => handletheme(e.target.checked)} 
            checked={theme === "dark"}
          />
          <svg className="swap-on fill-current w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z"/></svg>
          <svg className="swap-off fill-current w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z"/></svg>
        </label>

        {/*  Notifications  */}
        <div className="dropdown dropdown-end">
      <button tabIndex={0} className="text-[var(--primary)] transition-colors hover:text-[#c98405] relative p-2">
        <FaBell size={18} />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 w-4 h-4 bg-[#c98405] text-white text-[10px] flex items-center justify-center rounded-full font-bold">
            {unreadCount}
          </span>
        )}
      </button>
      <ul tabIndex={0} className="mt-4 z-[50] p-2 shadow-2xl menu menu-sm dropdown-content bg-[var(--card-bg)] rounded-xl w-80 border border-[var(--primary)]/10 text-[var(--text-main)] max-h-[400px] overflow-y-auto">
        <li className="menu-title text-[var(--primary)] text-[10px] uppercase tracking-widest opacity-60">Intelligence Feed</li>
        {notifications.length === 0 ? (
          <li className="p-4 text-center opacity-50 text-xs  font-poppins">No new briefings available.</li>
        ) : (
          notifications.map(n => (
            <li key={n._id} className={`${!n.isRead ? 'bg-[var(--primary)]/5' : ''} border-b border-white/5`}>
              <Link 
                to={n.link} 
                onClick={() => markAsRead.mutate(n._id)}
                className="flex flex-col items-start gap-1 py-3"
              >
                <div className="flex justify-between w-full items-center">
                   <span className="font-bold text-[var(--primary)] text-xs uppercase">{n.title}</span>
                   <span className="text-[8px] opacity-40">{new Date(n.timestamp).toLocaleTimeString()}</span>
                </div>
                <p className="text-[11px] leading-tight opacity-80">{n.message}</p>
              </Link>
            </li>
          ))
        )}
      </ul>
    </div>

        {/*  User Profile Dropdown */}
        <div className="flex items-center gap-3 border-l border-[var(--primary)]/10 pl-6">
          <div className="text-right hidden sm:block">
            <p className="text-sm text-gradient-gold">{users?.displayName || "Elite Member"}</p>
            <p className="text-[9px] text-[var(--primary)] font-bold uppercase tracking-widest">Active Status</p>
          </div>

          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar border border-[var(--primary)] p-[2px]">
              <div className="w-full rounded-full ring ring-[var(--primary)] ring-offset-base-100 ring-offset-2">
                <img src={users?.photoURL || "https://i.ibb.co/0n6CkP9/user.png"} alt="profile" />
              </div>
            </div>
            <ul tabIndex={0} className="mt-4 z-[50] p-2 shadow-2xl menu menu-sm dropdown-content bg-[var(--card-bg)] rounded-xl w-60 border border-[var(--primary)]/10 text-[var(--text-main)]">
              <li className="menu-title text-[var(--primary)] text-[10px] uppercase tracking-widest opacity-60">Account Settings</li>
              <li><Link to="/dashboard/profile" className="py-3 flex gap-3 items-center hover:text-[var(--primary)]"><FaUserCircle /> My Profile Details</Link></li>
              <div className="h-[1px] bg-[var(--primary)]/5 my-1"></div>
              <li>
                <button 
                  onClick={handleLogout} 
                  className="py-3 flex gap-3 items-center text-red-500 hover:bg-red-500/10 font-bold"
                >
                  <FaSignOutAlt /> Terminate Session
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DasNavbar;