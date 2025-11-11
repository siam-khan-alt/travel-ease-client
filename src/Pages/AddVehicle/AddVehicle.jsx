import React, { use,  } from "react";
import { AuthContext } from "../../Context/AuthContext";
import useAxios from "../../Hooks/useAxios";
import { toast } from "react-toastify";
import { format } from "date-fns";
import Motions from "../../Component/Motions";
const AddVehicle = () => {
  const { users } = use(AuthContext);
  const instanceAxios = useAxios();

 

  const handleSubmit = (e) => {
    e.preventDefault()
    const vehicleName = e.target.vehicleName.value
    const owner = e.target.owner.value
    const userEmail = e.target.userEmail.value
    const pricePerDay = e.target.pricePerDay.value
    const location = e.target.location.value
    const description = e.target.description.value
    const coverImage = e.target.coverImage.value
    const sets = e.target.sets.value
    const availability = e.target.availability.value
    const categories = e.target.categories.value
     const newVehicle ={
      vehicleName,
    owner,
    userEmail,
    pricePerDay,
    location,
    description,
    coverImage,
    sets,
    availability,
    categories,
    createdAt: format(new Date(), "yyyy-MM-dd hh:mm:ss a")
     }
  instanceAxios.post("/vehicles", newVehicle)
  .then((res)=>{
    if (res.data.insertedId) toast.success("Vehicle added successfully!")
  })
  .catch((err) => toast.error(err.message));
  };

  
  return (
    <Motions className="max-w-2xl mx-auto p-6 bg-white shadow-lg dark:bg-[#1E293B] rounded-xl mt-6">
      <h2 className="text-3xl text-center font-bold mb-4 text-[#3D405B]">Add Vehicle</h2>
      <form className="space-y-3" onSubmit={handleSubmit}>
      
        <div className="flex flex-col md:flex-row md:space-x-3 space-y-3 md:space-y-0">
          <input
            type="text"
            name="vehicleName"
            placeholder="Vehicle Name"
           
            className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#E07A5F]"
            required
          />
          <input
            type="text"
            name="owner"
            placeholder="Owner"
            value={users?.displayName|| "User"}
            
            className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#E07A5F]"
            required
          />
        </div>

        <div className="flex flex-col md:flex-row md:space-x-3 space-y-3 md:space-y-0">
          <input
            type="email"
            name="userEmail"
            placeholder="User Email"
            value={users?.email}
            className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#E07A5F]"
            required
            
          />
          <input
            type="number"
            name="pricePerDay"
            min={1}
            step={1}
            placeholder="Price per Day"
            className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#E07A5F]"
            required
          />
        </div>
        <div className="flex flex-col md:flex-row md:space-x-3 space-y-3 md:space-y-0">
          <input
            type="text"
            name="location"
            placeholder="Location"
            className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#E07A5F]"
            required
          />
          <input
            type="number"
            name="sets"
            placeholder="Seats"
            min={1}
            step={1}
            className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#E07A5F]"
            required
          />
        </div>
        <div className="flex flex-col md:flex-row md:space-x-3 space-y-3 md:space-y-0">
          <input
            type="text"
            name="coverImage"
            placeholder="Cover Image URL"
            className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#E07A5F]"
            required
          />
          <select
            name="availability"
            className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#E07A5F]"
          >
            <option value="Available">Available</option>
            <option value="Booked">Booked</option>
          </select>
        </div>
        <select
          name="categories"
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#E07A5F]"
        >
          <option value="Sedan">Sedan</option>
          <option value="SUV">SUV</option>
          <option value="Electric">Electric</option>
          <option value="Van">Van</option>
        </select>
        <textarea
          name="description"
          placeholder="Description"
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#E07A5F]"
          rows={3}
          required
        />

        <button
          type="submit"
          className="btn-gradient"
        >
          Add Vehicle
        </button>
      </form>
    </Motions>
  );
};

export default AddVehicle;
