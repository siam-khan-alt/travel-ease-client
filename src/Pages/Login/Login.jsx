import React, { useState, useContext } from "react";
import { FaEye, FaGoogle } from "react-icons/fa";
import { IoEyeOff } from "react-icons/io5";
import { Link,  useLocation,  useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../../Context/AuthContext";
const Login = () => {
 

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");

  const { Login, SignInGoogle, setUser, setLoading } = useContext(AuthContext);
  const location = useLocation();
  const backLocation = location.state || "/";
  
  const navigate = useNavigate();
  

  const togglePassword = () => setShowPassword(!showPassword);

  const handleLogIn = (e) => {
    e.preventDefault();
    setLoading(true);

    const email = e.target.email.value;
    const password = e.target.password.value;

    Login(email, password)
      .then((res) => {
        setUser(res.user);
        toast.success("Login successful!");
        setLoading(false);
        navigate(backLocation);
      })
      .catch((err) => {
        toast.error(err.message);
        setLoading(false);
      });
  };

  const handleGoogleSignIn = () => {
    setLoading(true);
    SignInGoogle()
      .then((res) => {
        setUser(res.user);
        toast.success("Google SignIn successful!");
        setLoading(false);
        navigate(backLocation);
      })
      .catch((err) => {
        toast.error(err.message);
        setLoading(false);
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen  px-4">
     <div className="bg-base-100 dark:bg-[#1E293B] shadow-lg rounded-xl p-8 w-full max-w-md transition-colors duration-300">
  <h2 className="text-3xl font-bold text-[#3D405B] dark:text-[#E2E8F0] mb-6 text-center">Login</h2>

        <form onSubmit={handleLogIn} className="space-y-4">
          <div className="flex flex-col">
            <label className="text-[#3D405B] font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#E07A5F]"
              required
            />
          </div>
          <div className="flex flex-col relative">
            <label className="text-[#3D405B] font-medium mb-1">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter your password"
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#E07A5F]"
              required
            />
            <span
              onClick={togglePassword}
              className="absolute right-3 top-[38px] cursor-pointer text-gray-500"
            >
              {showPassword ? <FaEye /> : <IoEyeOff />}
            </span>
          </div>
          <div>
            <Link to="/reset" state={{ email }}>
              <p className="link link-hover text-[#E07A5F] hover:text-[#D35D42]">
                Forgot password?
              </p>
            </Link>
          </div>
          <button
            type="submit"
            className="btn-gradient"
          >
            Login
          </button>
        </form>

        <p className="text-center text-[#3D405B] my-2">OR</p>
        <button
          onClick={handleGoogleSignIn}
          className="flex items-center justify-center w-full gap-2 bg-white border border-gray-300 text-[#3D405B] py-2 px-4 rounded-full shadow-md hover:bg-[#E07A5F] hover:text-white transition duration-300"
        >
          <FaGoogle size={20} />
          Login with Google
        </button>
        <p className="text-[#3D405B] text-center mt-3">
          Don't have an account?{" "}
          <Link to="/register" className="text-[#E07A5F] font-medium hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
