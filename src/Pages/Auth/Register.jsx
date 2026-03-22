import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
import { toast } from "react-toastify";
import { AuthContext } from "../../Context/AuthContext";
import useAxios from "../../Hooks/useAxios";
import { format } from "date-fns";
import Motions from "../../Component/Motions";
import Swal from "sweetalert2";

const Register = () => {
  const { SignUp, profileUpdate, SignInGoogle, setUser, setLoading } =
    useContext(AuthContext);
  const navigate = useNavigate();
  const [errors, setErrors] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePassword = () => setPasswordVisible(!passwordVisible);
  const instanceAxios = useAxios();

  // SweetAlert Dynamic Colors based on theme
  const getSwalColors = () => {
    const isDark = document.documentElement.getAttribute("data-theme") === "dark";
    return {
      background: isDark ? "#111827" : "#FFFFFF",
      color: isDark ? "#F1F5F9" : "#0F172A",
      confirmButtonColor: "#D4AF37",
    };
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors("");

    const displayName = e.target.name.value;
    const photoURL = e.target.photo.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    // Validation
    if (password.length < 6) {
      setErrors("Password must be at least 6 characters long!");
      setLoading(false);
      return;
    }
    if (!/[A-Z]/.test(password)) {
      setErrors("Password must contain at least one uppercase letter!");
      setLoading(false);
      return;
    }

    SignUp(email, password)
      .then(() => {
        profileUpdate(displayName, photoURL)
          .then(() => {
            const newUser = {
              name: displayName,
              email,
              photo: photoURL,
              role: "user",
              createdAt: format(new Date(), "yyyy-MM-dd hh:mm:ss a"),
            };

            instanceAxios.post("/users", newUser).then(() => {
              Swal.fire({
                title: "Welcome to Travel Ease!",
                text: "Your account has been created as a User.",
                icon: "success",
                timer: 2000,
                showConfirmButton: false,
                ...getSwalColors(),
              });
              e.target.reset();
              navigate("/");
            });
          })
          .catch((err) => toast.error(err.message));
        setLoading(false);
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

        instanceAxios.post("/users", newUser).then(() => {
          Swal.fire({
            title: "Success!",
            text: "Logged in successfully with Google",
            icon: "success",
            timer: 2000,
            showConfirmButton: false,
            ...getSwalColors(),
          });
          navigate("/");
        });
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: err.message,
          ...getSwalColors(),
        });
        setLoading(false);
      });
  };

  return (
    <Motions className="flex items-center justify-center min-h-screen px-4 py-10 bg-[var(--bg-main)]">
      <div className="bg-[var(--card-bg)] shadow-[0_20px_50px_rgba(0,0,0,0.2)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-[var(--primary)]/10 rounded-2xl p-8 w-full max-w-md transition-all duration-300">
        <h2 className="heading">
          JOIN ELITE
        </h2>
        <p className="text-center text-[var(--text-main)]/60 text-sm mb-8 uppercase tracking-widest">
          Start your luxury journey
        </p>

        <form onSubmit={handleSignUp} className="space-y-5">
          <div className="flex flex-col">
            <label className="text-[var(--text-main)] text-xs font-bold uppercase tracking-wider mb-2">Full Name</label>
            <input
              type="text"
              name="name"
              placeholder="Siam Khan"
              className="bg-[var(--bg-main)] border border-[var(--primary)]/20 text-[var(--text-main)] rounded-lg px-4 py-3 focus:outline-none focus:ring-1 focus:ring-[var(--primary)] transition-all"
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="text-[var(--text-main)] text-xs font-bold uppercase tracking-wider mb-2">Photo URL</label>
            <input
              type="text"
              name="photo"
              placeholder="https://example.com/photo.jpg"
              className="bg-[var(--bg-main)] border border-[var(--primary)]/20 text-[var(--text-main)] rounded-lg px-4 py-3 focus:outline-none focus:ring-1 focus:ring-[var(--primary)] transition-all"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-[var(--text-main)] text-xs font-bold uppercase tracking-wider mb-2">Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="email@example.com"
              className="bg-[var(--bg-main)] border border-[var(--primary)]/20 text-[var(--text-main)] rounded-lg px-4 py-3 focus:outline-none focus:ring-1 focus:ring-[var(--primary)] transition-all"
              required
            />
          </div>
          <div className="flex flex-col relative">
            <label className="text-[var(--text-main)] text-xs font-bold uppercase tracking-wider mb-2">Password</label>
            <input
              type={passwordVisible ? "text" : "password"}
              name="password"
              placeholder="••••••••"
              className="bg-[var(--bg-main)] border border-[var(--primary)]/20 text-[var(--text-main)] rounded-lg px-4 py-3 focus:outline-none focus:ring-1 focus:ring-[var(--primary)] transition-all"
              required
            />
            <span
              onClick={togglePassword}
              className="absolute right-4 top-[42px] cursor-pointer text-[var(--primary)]"
            >
              {passwordVisible ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          {errors && <p className="text-red-500 text-xs font-medium bg-red-500/10 p-2 rounded-md border border-red-500/20">{errors}</p>}

          <button type="submit" className="btn-gradient w-full mt-4 text-sm">
            Create Account
          </button>
        </form>

        <div className="relative my-8 text-center">
          <hr className="border-[var(--primary)]/10" />
          <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[var(--card-bg)] px-4 text-[var(--text-main)]/40 text-xs font-bold tracking-widest uppercase">
            OR
          </span>
        </div>

        <button
          onClick={handleGoogleSignIn}
          className="flex items-center justify-center w-full gap-3 bg-transparent border border-[var(--primary)]/30 text-[var(--text-main)] py-3 px-4 rounded-lg hover:bg-[var(--primary)] hover:text-[#0A0F14] transition-all duration-300 font-bold text-xs uppercase tracking-widest"
        >
          <FaGoogle size={16} />
          Continue with Google
        </button>

        <p className="text-[var(--text-main)]/60 text-center mt-8 text-sm">
          Already part of the elite?{" "}
          <Link
            to="/login"
            className="text-[var(--primary)] font-bold hover:underline underline-offset-4"
          >
            Login
          </Link>
        </p>
      </div>
    </Motions>
  );
};

export default Register;