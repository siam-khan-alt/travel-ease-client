import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
import { toast } from "react-toastify";
import { AuthContext } from "../../Context/AuthContext";
import useAxios from "../../Hooks/useAxios";


const Register = () => {
  const { SignUp, profileUpdate, SignInGoogle, setUser, setLoading } = useContext(AuthContext);
  const navigate = useNavigate();
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePassword = () => setPasswordVisible(!passwordVisible);
 const instanceAxios=useAxios()
  const handleSignUp = (e) => {
    e.preventDefault();
    setLoading(true);

    const displayName = e.target.name.value;
    const photoURL = e.target.photo.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long!");
      setLoading(false);
      return;
    }
    if (!/[A-Z]/.test(password)) {
      toast.error("Password must contain at least one uppercase letter!");
      setLoading(false);
      return;
    }
    if (!/[a-z]/.test(password)) {
      toast.error("Password must contain at least one lowercase letter!");
      setLoading(false);
      return;
    }

    SignUp(email, password)
      .then(() => {
        profileUpdate(displayName, photoURL)
          .then(() => {
              const newUser={
               name: displayName,
              email,
              photo: photoURL,
              createdAt: new Date(),
        }
        instanceAxios.post('/users', newUser)
        .then(()=>{
           toast.success("Registration successful!");
            e.target.reset();
            navigate("/"); 
        })
           
          })
          .catch((err) => toast.error(err.message));
        setLoading(false);
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
          const user = res.user;
          setUser(res.user)
   
    const newUser = {
      name: user.displayName,
      email: user.email,
      photo: user.photoURL,
      createdAt: new Date()
    };
    instanceAxios.post('/users', newUser)
      .then(() => {
        toast.success("Google Signin successful");
        navigate("/");
      })
      
      })
      .catch((err) => {
        toast.error(err.message);
        setLoading(false);
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#F4F1DE] px-4">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-[#3D405B] mb-6 text-center">Register</h2>

        <form onSubmit={handleSignUp} className="space-y-4">
          <div className="flex flex-col">
            <label className="text-[#3D405B] font-medium mb-1">Name</label>
            <input
              type="text"
              name="name"
              placeholder="Your Full Name"
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#E07A5F]"
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="text-[#3D405B] font-medium mb-1">Photo URL</label>
            <input
              type="text"
              name="photo"
              placeholder="Your Photo URL"
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#E07A5F]"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-[#3D405B] font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#E07A5F]"
              required
            />
          </div>
          <div className="flex flex-col relative">
            <label className="text-[#3D405B] font-medium mb-1">Password</label>
            <input
              type={passwordVisible ? "text" : "password"}
              name="password"
              placeholder="Enter your password"
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#E07A5F]"
              required
            />
            <span
              onClick={togglePassword}
              className="absolute right-3 top-[38px] cursor-pointer text-gray-500"
            >
              {passwordVisible ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-[#E07A5F] to-[#F2CC8F] text-white py-2 rounded-full font-semibold shadow-md hover:from-[#D35D42] hover:to-[#E4B462] transition duration-300"
          >
            Register
          </button>
        </form>

        <p className="text-center text-[#3D405B] my-2">OR</p>
        <button
          onClick={handleGoogleSignIn}
          className="flex items-center justify-center w-full gap-2 bg-white border border-gray-300 text-[#3D405B] py-2 px-4 rounded-full shadow-md hover:bg-[#E07A5F] hover:text-white transition duration-300"
        >
          <FaGoogle size={20} />
          Register with Google
        </button>
        <p className="text-[#3D405B] text-center mt-3">
          Already have an account?{" "}
          <Link to="/login" className="text-[#E07A5F] font-medium hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
