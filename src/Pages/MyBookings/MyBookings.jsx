import React, { useEffect, useState,  use } from "react";
import { AuthContext } from "../../Context/AuthContext";
import useAxios from "../../Hooks/useAxios";
import LoadingSpinner from "../../Component/LoadingSpinner";
import { FaCar, FaDollarSign, FaMapMarkerAlt, FaCalendarAlt } from "react-icons/fa";
import Motions from "../../Component/Motions";

const MyBookings = () => {
  const { users} = use(AuthContext);
  const [bookings, setBookings] = useState([]);
  const instanceAxios = useAxios();
  const [Loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true)
    instanceAxios
      .get(`/bookings?email=${users.email}`)
      .then((res) => setBookings(res.data))
      .finally(()=>setLoading(false))
  }, [users?.email, instanceAxios]);

  if (Loading) return <LoadingSpinner />;

  if (bookings.length === 0) {
    return (
      <Motions className="min-h-screen flex text-3xl font-bold  items-center justify-center text-gray-500 dark:text-gray-400">
        <p>No bookings found.</p>
      </Motions>
    );
  }

  return (
    <Motions className="min-h-screen px-4 py-8 bg-gray-100 dark:bg-gray-900">
      <div className="container mx-auto">
        <h2 className=" mb-6 main-heading">
          My Bookings
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="bg-white dark:bg-gray-800 shadow-md rounded-2xl overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <img
                src={booking.image}
                alt={booking.vehicleName}
                className="w-full h-48 object-cover"
              />
              <div className="p-4 text-gray-800 dark:text-gray-100">
                <h3 className="text-xl font-semibold mb-2">{booking.vehicleName}</h3>
                <p className="text-gray-500 dark:text-gray-300 mb-2">{booking.location}</p>
                
                <div className="flex flex-col gap-1 text-sm mb-2">
                  <p className="flex items-center gap-2">
                    <FaCar /> Category: {booking.category}
                  </p>
                  <p className="flex items-center gap-2">
                    <FaDollarSign /> Price/Day: ${booking.price}
                  </p>
                  <p className="flex items-center gap-2">
                    <FaCalendarAlt /> Status: {booking.status}
                  </p>
                  <p className="flex items-center gap-2">
                    <FaMapMarkerAlt /> Owner: {booking.ownerName}
                  </p>
                </div>

                <p className="text-gray-400 dark:text-gray-300 text-sm">
                  Booked At: {new Date(booking.bookedAt).toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Motions>
  );
};

export default MyBookings;
