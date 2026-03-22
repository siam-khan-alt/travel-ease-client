import React, { useState, useContext } from "react";
import { FaEye, FaGoogle, FaUserShield, FaUserTie, FaUserCog } from "react-icons/fa";
import { IoEyeOff } from "react-icons/io5";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
import Motions from "../../Component/Motions";
import { format } from "date-fns";
import useAxios from "../../Hooks/useAxios";
import Swal from "sweetalert2";

const Login = () => {
  const [errors, setErrors] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { Login, SignInGoogle, setUser, setLoading } = useContext(AuthContext);
  const location = useLocation();
  const backLocation = location.state || "/";
  const navigate = useNavigate();
  const instanceAxios = useAxios();

  const togglePassword = () => setShowPassword(!showPassword);

  // SweetAlert Dynamic Style
  const getSwalStyle = () => {
    const isDark = document.documentElement.getAttribute("data-theme") === "dark";
    return {
      background: isDark ? "#111827" : "#FFFFFF",
      color: isDark ? "#F1F5F9" : "#0F172A",
      confirmButtonColor: "#D4AF37",
    };
  };

  // Demo Login Handler
  const handleDemoLogin = (roleEmail, rolePass, roleName) => {
    setEmail(roleEmail);
    setPassword(rolePass);

    Swal.fire({
      toast: true,
      position: "top-end",
      icon: "info",
      title: `${roleName} credentials applied!`,
      showConfirmButton: false,
      timer: 1500,
      timerProgressBar: true,
      ...getSwalStyle(),
      iconColor: "#D4AF37",
    });
  };

  const handleLogIn = (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors("");

    Login(email, password)
      .then((res) => {
        setUser(res.user);
        Swal.fire({
          title: "Welcome Back!",
          text: "Elite access granted.",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
          ...getSwalStyle(),
        });
        setLoading(false);
        navigate(backLocation);
      })
      .catch((err) => {
        setErrors(err.message);
        setLoading(false);
      });
  };

  const handleGoogleSignIn = () => {
    setLoading(true);
    SignInGoogle()
      .then((res) => {
        const user = res.user;
        setUser(user);

        const newUser = {
          name: user.displayName,
          email: user.email,
          photo: user.photoURL,
          role: "user", 
          createdAt: format(new Date(), "yyyy-MM-dd hh:mm:ss a"),
        };

        instanceAxios.post("/users", newUser).finally(() => {
          Swal.fire({
            title: "Success!",
            text: "Google Login Successful",
            icon: "success",
            timer: 2000,
            showConfirmButton: false,
            ...getSwalStyle(),
          });
          setLoading(false);
          navigate(backLocation);
        });
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: err.message,
          ...getSwalStyle(),
        });
        setLoading(false);
      });
  };

  return (
    <Motions className="flex items-center justify-center min-h-screen px-4 bg-[var(--bg-main)] py-10">
      <div className="bg-[var(--card-bg)] shadow-[0_20px_50px_rgba(0,0,0,0.2)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-[var(--primary)]/10 rounded-2xl p-8 w-full max-w-md transition-all duration-300">
      <h2 className="heading">
     
      LOGIN ELITE
  </h2>
        <p className="text-center text-[var(--text-main)]/60 text-xs mb-8 uppercase tracking-[0.2em]">
          Enter your executive credentials
        </p>

        {/* Demo Credentials Section */}
        <div className="grid grid-cols-1 gap-2 mb-8">
          <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--primary)] mb-1 text-center">
            Quick Demo Access
          </p>
          <div className="flex flex-wrap gap-2 justify-center">
            <button
              onClick={() => handleDemoLogin("user@travelease.com", "User123!", "User")}
              className="flex-1 flex items-center justify-center gap-2 py-2 px-3 bg-[var(--bg-main)] text-[var(--text-main)] border border-[var(--primary)]/20 rounded-lg hover:border-[var(--primary)] transition-all text-[10px] font-bold uppercase tracking-tighter"
            >
              <FaUserShield className="text-[var(--primary)]" /> User
            </button>
            <button
              onClick={() => handleDemoLogin("host@travelease.com", "Host123!", "Host")}
              className="flex-1 flex items-center justify-center gap-2 py-2 px-3 bg-[var(--bg-main)] text-[var(--text-main)] border border-[var(--primary)]/20 rounded-lg hover:border-[var(--primary)] transition-all text-[10px] font-bold uppercase tracking-tighter"
            >
              <FaUserTie className="text-[var(--primary)]" /> Host
            </button>
            <button
              onClick={() => handleDemoLogin("admin@travelease.com", "Admin123!", "Admin")}
              className="flex-1 flex items-center justify-center gap-2 py-2 px-3 bg-[var(--bg-main)] text-[var(--text-main)] border border-[var(--primary)]/20 rounded-lg hover:border-[var(--primary)] transition-all text-[10px] font-bold uppercase tracking-tighter"
            >
              <FaUserCog className="text-[var(--primary)]" /> Admin
            </button>
          </div>
        </div>

        <form onSubmit={handleLogIn} className="space-y-5">
          <div className="flex flex-col">
            <label className="text-[var(--text-main)] text-xs font-bold uppercase tracking-wider mb-2">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="executive@travelease.com"
              className="bg-[var(--bg-main)] border border-[var(--primary)]/20 text-[var(--text-main)] rounded-lg px-4 py-3 focus:outline-none focus:ring-1 focus:ring-[var(--primary)] transition-all"
              required
            />
          </div>
          <div className="flex flex-col relative">
            <label className="text-[var(--text-main)] text-xs font-bold uppercase tracking-wider mb-2">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="bg-[var(--bg-main)] border border-[var(--primary)]/20 text-[var(--text-main)] rounded-lg px-4 py-3 focus:outline-none focus:ring-1 focus:ring-[var(--primary)] transition-all"
              required
            />
            <span
              onClick={togglePassword}
              className="absolute right-4 top-[42px] cursor-pointer text-[var(--primary)]"
            >
              {showPassword ? <FaEye /> : <IoEyeOff />}
            </span>
          </div>

          {errors && <p className="text-red-500 text-[10px] font-bold bg-red-500/10 p-2 rounded-md border border-red-500/20 uppercase tracking-wide">{errors}</p>}

          <div className="text-right">
            <button type="button" className="text-[var(--primary)] text-[10px] font-bold uppercase hover:underline">
              Forgot Access Key?
            </button>
          </div>

          <button type="submit" className="btn-gradient w-full mt-2 text-sm">
            Authenticate
          </button>
        </form>

        <div className="relative my-8 text-center">
          <hr className="border-[var(--primary)]/10" />
          <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[var(--card-bg)] px-4 text-[var(--text-main)]/40 text-[10px] font-bold tracking-[0.3em] uppercase">
            Social
          </span>
        </div>

        <button
          onClick={handleGoogleSignIn}
          className="flex items-center justify-center w-full gap-3 bg-transparent border border-[var(--primary)]/30 text-[var(--text-main)] py-3 px-4 rounded-lg hover:bg-[var(--primary)] hover:text-[#0A0F14] transition-all duration-300 font-bold text-xs uppercase tracking-widest"
        >
          <FaGoogle size={16} />
          Continue with Google
        </button>

        <p className="text-[var(--text-main)]/60 text-center mt-8 text-xs uppercase tracking-widest">
          New to the fleet?{" "}
          <Link to="/register" className="text-[var(--primary)] font-black hover:underline underline-offset-4">
            Register
          </Link>
        </p>
      </div>
    </Motions>
  );
};

export default Login;