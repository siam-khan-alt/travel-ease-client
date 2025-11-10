import React, { use } from "react";

import { FaMapMarkerAlt, FaDollarSign, FaCar, FaCalendarAlt } from "react-icons/fa";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
import { toast } from "react-toastify";
import useAxios from "../../Hooks/useAxios";
import LoadingSpinner from "../../Component/LoadingSpinner";

const Details = () => {
  const vehicle = useLoaderData();
  const { users}=use(AuthContext)
   const instanceAxios = useAxios();

  const handleBooking = async () => {
    if (!users) {
      toast.error("Please login to book a vehicle!");
      return;
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
      sets:vehicle.sets,
      status: "Pending",
      bookedAt: new Date(),
    };

   instanceAxios.post("/bookings", bookingData)
  .then(res => {
    if (res.data.insertedId) toast.success("Vehicle booked successfully!");
  })
  .catch(error => {
    if (error.response && error.response.data?.message) {
    toast.error(error.response.data.message)}
   else{ toast.error("Failed to book vehicle!");}
   
  });
  };
  
  
  if (!vehicle) {
    return <LoadingSpinner/>
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 px-4 py-8">
      <div className="max-w-5xl mx-auto bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-2xl rounded-xl p-6 md:p-10">
      
        <div className="flex flex-col md:flex-row gap-6">
          <img
            src={vehicle?.coverImage}
            alt=""
            className="w-full md:w-1/2 rounded-lg object-cover h-[300px] md:h-[400px]"
          />
          <div className="flex-1 ">
            <h2 className="text-4xl font-bold mb-4">{vehicle.vehicleName}</h2>
            <p className="mb-4 text-gray-600 dark:text-gray-300">{vehicle?.description}</p>

            <div className="flex flex-col gap-3 mb-4">
              <p className="flex items-center gap-2">
                <FaCar /> <span>Category: {vehicle?.category}</span>
              </p>
              <p className="flex items-center gap-2">
                <FaDollarSign /> <span>Price/Day: ${vehicle?.pricePerDay}</span>
              </p>
              <p className="flex items-center gap-2">
                <FaMapMarkerAlt /> <span>Location: {vehicle?.location}</span>
              </p>
              <p className="flex items-center gap-2">
                <FaCalendarAlt /> <span>Status: {vehicle?.availability}</span>
              </p>
            </div>
            <div className="mb-4">
              <h3 className="text-xl font-semibold mb-2">Owner</h3>
              <p>{vehicle?.owner}</p>
              <p className="text-gray-400 dark:text-gray-400">{vehicle?.userEmail}</p>
            </div>
            <button onClick={handleBooking} className="btn w-full md:w-auto bg-gradient-to-r from-[#E07A5F] to-[#F2CC8F] hover:from-[#D35D42] hover:to-[#E4B462] text-white rounded-full py-2 px-6 transition duration-300">
              Book Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
