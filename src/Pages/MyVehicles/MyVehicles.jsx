import React, { use, useEffect, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import useAxios from "../../Hooks/useAxios";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const MyVehicles = () => {
  const { users } = use(AuthContext);
  const [myVehicles, setMyVehicles] = useState([]);
  const instanceAxios = useAxios();

  useEffect(() => {
    if (!users?.email) return;
    instanceAxios
      .get(`/vehicles/users?email=${users.email}`)
      .then((res) => setMyVehicles(res.data))
      .catch((err) => console.log(err));
  }, [users?.email, instanceAxios]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        instanceAxios
          .delete(`/vehicles/${id}`)
          .then(() => {
            toast.success("Vehicle deleted successfully!");
            setMyVehicles(myVehicles.filter((v) => v._id !== id));
          })
          .catch((err) => toast.error(err.message));
      }
    });
  };

  return (
    <div className="max-w-6xl mx-auto p-6 mt-6">
      <h2 className="text-3xl font-bold text-center text-[#3D405B] mb-6">
        My Vehicles
      </h2>

      {myVehicles.length === 0 && (
        <p className="text-center text-gray-500 text-lg">
          You have not added any vehicles yet.
        </p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {myVehicles.map((vehicle) => (
          <div
            key={vehicle._id}
            className="bg-white shadow-md rounded-2xl overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            <img
              src={vehicle.coverImage}
              alt={vehicle.vehicleName}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold text-[#3D405B]">
                {vehicle.vehicleName}
              </h3>
              <p className="text-[#3D405B] mt-1">{vehicle.location}</p>
              <p className="text-[#E07A5F] font-semibold mt-2">
                ${vehicle.pricePerDay}/day
              </p>
              <p className="text-gray-500 text-sm mt-1">
                Seats: {vehicle.sets} | Category: {vehicle.categories} |{" "}
                {vehicle.availability}
              </p>

              <div className="flex gap-3 mt-4">
                <button className="flex-1 py-2 rounded-full bg-gradient-to-r from-[#E07A5F] to-[#F2CC8F] text-white font-semibold hover:from-[#D35D42] hover:to-[#E4B462] transition duration-300 shadow-md">
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(vehicle._id)}
                  className="flex-1 py-2 rounded-full bg-gradient-to-r from-red-500 to-red-400 text-white font-semibold hover:from-red-600 hover:to-red-500 transition duration-300 shadow-md"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyVehicles;
