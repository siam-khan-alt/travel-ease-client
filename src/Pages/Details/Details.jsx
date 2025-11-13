import React, { use, useState } from "react";

import { FaMapMarkerAlt, FaDollarSign, FaCar, FaCalendarAlt } from "react-icons/fa";
import { useLoaderData } from "react-router-dom";
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

  const handleBooking = async () => {
   
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
      bookingCount: vehicle.bookingCount
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
  
  
  if (!vehicle) {
    return <LoadingSpinner/>
  }

  return (
    <Motions className="min-h-screen bg-gray-100 dark:bg-gray-900 px-4 py-8">
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
              <p className="flex items-center gap-2 font-medium text-blue-600 dark:text-yellow-400"> Total Bookings: {bookingCount}</p>
            </div>
            <div className="mb-4">
              <h3 className="text-xl font-semibold mb-2">Owner</h3>
              <p>{vehicle?.owner}</p>
              <p className="text-gray-400 dark:text-gray-400">{vehicle?.userEmail}</p>
            </div>
            <button onClick={handleBooking} className="btn-gradient">
              Book Now
            </button>
          </div>
        </div>
      </div>
    </Motions>
  );
};

export default Details;
