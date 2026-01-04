import React, { use, useEffect, useState } from "react";

import { FaMapMarkerAlt, FaDollarSign, FaCar, FaCalendarAlt, FaStar, FaInfoCircle, FaCheckCircle, FaUsers } from "react-icons/fa";
import { useLoaderData, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
import { toast } from "react-toastify";
import useAxios from "../../Hooks/useAxios";
import LoadingSpinner from "../../Component/LoadingSpinner";
import Motions from "../../Component/Motions";
const Details = () => {
  const vehicle = useLoaderData();
  const { users}=use(AuthContext)
   const instanceAxios = useAxios();
   const [bookingCount, setBookingCount] = useState(vehicle.bookingCount || 0)
   const [activeImg, setActiveImg] = useState(vehicle?.coverImage);
   const [relatedVehicles, setRelatedVehicles] = useState([]);
   const navigate = useNavigate();
  const location = useLocation();
  const handleBooking = async () => {
    if (!users) {
      toast.warning("Please login to book this vehicle!");
      return navigate("/login", { state: location.pathname });
    }
   
   const bookingData = {
      userEmail: users.email,
      userName: users.displayName,
      vehicleId: vehicle._id,
      ownerName: vehicle.owner,
      ownerEmail: vehicle.userEmail,
      vehicleName: vehicle.vehicleName,
      price: vehicle.pricePerDay,
      image: vehicle.coverImage,
      location: vehicle.location,
      category: vehicle.categories,
      sets: vehicle.seats,
      status: "Pending",
      bookedAt: new Date(),
    };
   instanceAxios.post("/bookings", bookingData)
  .then(res => {
    if (res.data.insertedId) {toast.success("Vehicle booked successfully!")
       setBookingCount(prev => prev + 1)
    };
  })
  .catch(error => {
    if (error.response && error.response.data?.message) {
    toast.error(error.response.data.message)}
   else{ toast.error("Failed to book vehicle!");}
   
  });
  };
  
  useEffect(() => {
  if (vehicle?.categories) {
    instanceAxios
      .get(`/related-vehicles?category=${vehicle.categories}&currentId=${vehicle._id}`)
      .then((res) => setRelatedVehicles(res.data))
      .catch((err) => console.log(err));
  }
}, [vehicle, instanceAxios]);
  
  if (!vehicle) {
    return <LoadingSpinner/>
  }

  return (
   <Motions className=" bg-[#F4F1DE] dark:bg-[#1E293B] font-sans"> <div className="min-h-screen container px-4 mx-auto bg-[#F4F1DE] dark:bg-[#1E293B]  py-8 font-sans">
      <div className=" bg-white  dark:bg-[#0F172A] text-gray-900 dark:text-gray-100 shadow-2xl rounded-2xl p-6 md:p-10">
        
        <div className="flex flex-col lg:flex-row gap-10">
          
          <div className="w-full lg:w-1/2 space-y-4">
            <div className="relative">
              <img
                src={activeImg || vehicle.coverImage}
                alt="Main"
                className="w-full rounded-2xl object-cover h-[300px] md:h-[450px] shadow-lg transition-all duration-300"
              />
              <div className="absolute top-4 right-4 bg-white/90 dark:bg-black/70 px-3 py-1 rounded-full flex items-center gap-1 text-[#E07A5F] font-bold shadow">
                <FaStar /> {vehicle.ratings}
              </div>
            </div>
            
            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
              {[vehicle.coverImage, vehicle.additionalImg1, vehicle.additionalImg2].map((img, idx) => (
                img && (
                  <img
                    key={idx}
                    src={img}
                    onClick={() => setActiveImg(img)}
                    className={`w-20 h-16 md:w-24 md:h-20 rounded-2xl cursor-pointer object-cover border-2 transition-all ${
                      activeImg === img ? 'border-[#E07A5F] scale-105' : 'border-transparent opacity-60'
                    }`}
                  />
                )
              ))}
            </div>
          </div>

          <div className="flex-1 space-y-6">
            <div>
              <span className="bg-orange-100 text-[#E07A5F] dark:bg-orange-900/30 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
                {vehicle.categories}
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold mt-2 tracking-tight">{vehicle.vehicleName}</h2>
            </div>

            <div className="grid grid-cols-2 gap-y-6 border-y dark:border-gray-800 py-6">
              <div className="flex items-center gap-3">
                <FaDollarSign className="text-[#E07A5F] text-xl" />
                <span><span className="text-xl md:text-2xl font-black">${vehicle.pricePerDay}</span> / day</span>
              </div>
              <div className="flex items-center gap-3">
                <FaMapMarkerAlt className="text-[#E07A5F] text-xl" />
                <span className="text-sm md:text-base">{vehicle.location}</span>
              </div>
              <div className="flex items-center gap-3">
                <FaUsers className="text-[#E07A5F] text-xl" />
                <span className="text-sm md:text-base">{vehicle.seats} Seats</span>
              </div>
             <div className="flex items-center gap-3">
                <FaCalendarAlt className="text-[#E07A5F] text-xl" />
                <span className={`font-bold text-sm md:text-base ${vehicle.availability === 'Available' ? 'text-[#E07A5F]' : 'text-gray-400'}`}>
                  {vehicle.availability}
                </span>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800/50 p-5 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between border border-gray-100 dark:border-gray-800 gap-4">
              <div className="w-full sm:w-auto">
                <p className="text-[10px] text-gray-400 font-bold uppercase mb-1 tracking-wider">Listed by</p>
                <p className="font-bold text-lg leading-tight">{vehicle.owner}</p>
                <p className="text-sm text-gray-500 truncate">{vehicle.userEmail}</p>
              </div>
              <div className="w-full sm:w-auto sm:text-right border-t sm:border-t-0 pt-3 sm:pt-0 border-gray-200 dark:border-gray-700">
                <p className="text-[10px] text-gray-400 font-bold uppercase mb-1 tracking-wider">Popularity</p>
                <p className="text-[#E07A5F] font-black text-xl">{bookingCount} Bookings</p>
              </div>
            </div>

            <button onClick={handleBooking} className="btn-gradient w-full py-4 text-lg shadow-xl shadow-orange-500/20 hover:brightness-110 active:scale-[0.98] transition-all font-bold">
              Book This Vehicle
            </button>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-10 border-t dark:border-gray-800 pt-10">
          
          <div className="space-y-4">
            <h3 className="text-2xl font-bold flex items-center gap-2">
              <FaInfoCircle className="text-[#E07A5F]" /> Overview
            </h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm md:text-base text-justify">
              {vehicle.description}
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-2xl font-bold flex items-center gap-2">
              <FaCar className="text-[#E07A5F]" /> Specifications
            </h3>
            <div className="grid grid-cols-1 gap-2">
              {vehicle.features?.map((feature, i) => (
                <div key={i} className="flex items-center gap-3 bg-gray-50 dark:bg-gray-800 p-3 rounded-2xl border border-gray-100 dark:border-gray-800">
                  <FaCheckCircle className="text-[#E07A5F]" />
                  <span className="font-medium text-sm md:text-base">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-2xl font-bold flex items-center gap-2">
              <FaCalendarAlt className="text-[#E07A5F]" /> Rental Rules
            </h3>
            <ul className="space-y-3">
              {vehicle.rules?.map((rule, i) => (
                <li key={i} className="flex gap-3 text-xs md:text-sm text-gray-600 dark:text-gray-400 italic">
                  <span className="text-[#E07A5F] font-bold">•</span> {rule}
                </li>
              ))}
            </ul>
          </div>

        </div>
        {relatedVehicles.length > 0 && (
          <div className="mt-16 border-t dark:border-gray-800 pt-10">
            <h3 className="text-3xl font-black mb-8 text-[#3D405B] dark:text-white flex items-center gap-3">
              <span className="w-2 h-8 bg-[#E07A5F] rounded-full"></span>
              Suggested <span className="text-[#E07A5F]">Vehicles</span>
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedVehicles.map((item) => (
                <div key={item._id} className="bg-[#F4F1DE] dark:bg-[#1E293B] rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden group hover:shadow-xl transition-all duration-300">
                  <div className="relative overflow-hidden h-40">
                    <img 
                      src={item.coverImage} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                    />
                    <div className="absolute bottom-2 right-2 bg-white/90 dark:bg-black/70 px-2 py-1 rounded-lg text-[#E07A5F] text-xs font-bold">
                      ${item.pricePerDay}/day
                    </div>
                  </div>
                  <div className="p-4">
                    <h4 className="font-bold text-gray-800 dark:text-gray-100 truncate mb-3">{item.vehicleName}</h4>
                    <button 
                      onClick={() => {
                        navigate(`/vehicles/${item._id}`);
                        window.scrollTo(0, 0);
                      }}
                      className="w-full py-2 bg-[#3D405B] hover:bg-[#E07A5F] text-white rounded-xl text-sm font-bold transition-colors"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        </div>
      </div>
    </Motions>
  );
};

export default Details;
