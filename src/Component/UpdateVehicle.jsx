import React from 'react';
import { useLoaderData } from 'react-router-dom';
import useAxios from '../Hooks/useAxios';
import { toast } from 'react-toastify';
import { format } from 'date-fns';
import Motions from './Motions';

const UpdateVehicle = () => {
    const vehicle = useLoaderData()
    const instanceAxios = useAxios()
  const handleUpdate=(e)=>{
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
     const updateVehicle ={
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
     instanceAxios.patch(`/vehicles/${vehicle?._id}`, updateVehicle)
       .then(()=>{
         toast.success("Vehicle updated successfully!")
       })
       .catch((err) => toast.error(err.message));
       
  }
    
    return (
        <Motions className="max-w-2xl mx-auto p-6 dark:bg-[#1E293B] bg-base-100 shadow-lg rounded-xl mt-6">
      <h2 className="text-3xl text-center font-bold mb-4 text-[#3D405B]">Update Vehicle</h2>
      <form className="space-y-3" onSubmit={handleUpdate}>
      
        <div className="flex flex-col md:flex-row md:space-x-3 space-y-3 md:space-y-0">
          <input
            type="text"
            name="vehicleName"
            placeholder="Vehicle Name"
            defaultValue={vehicle?.vehicleName}
            className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#E07A5F]"
            required
          />
          <input
            type="text"
            name="owner"
            placeholder="Owner"
            defaultValue={vehicle?.owner}
            
            className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#E07A5F]"
            required
          />
        </div>

        <div className="flex flex-col md:flex-row md:space-x-3 space-y-3 md:space-y-0">
          <input
            type="email"
            name="userEmail"
            placeholder="User Email"
            defaultValue={vehicle?.userEmail}
            className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#E07A5F]"
            required
          />
          <input
            type="number"
            name="pricePerDay"
            min={1}
            step={1}
            placeholder="Price per Day"
            defaultValue={vehicle?.pricePerDay}
            className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#E07A5F]"
            required
          />
        </div>
        <div className="flex flex-col md:flex-row md:space-x-3 space-y-3 md:space-y-0">
          <input
            type="text"
            name="location"
            placeholder="Location"
            defaultValue={vehicle?.location}
            className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#E07A5F]"
            required
          />
          <input
            type="number"
            name="sets"
            placeholder="Seats"
            min={1}
            step={1}
            defaultValue={vehicle?.sets}
            className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#E07A5F]"
            required
          />
        </div>
        <div className="flex flex-col md:flex-row md:space-x-3 space-y-3 md:space-y-0">
          <input
            type="text"
            name="coverImage"
            placeholder="Cover Image URL"
            defaultValue={vehicle?.coverImage}
            className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#E07A5F]"
            required
          />
          <select
            name="availability"
            defaultValue={vehicle?.availability}
            className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#E07A5F]"
          >
            <option value="Available">Available</option>
            <option value="Booked">Booked</option>
          </select>
        </div>
        <select
          name="categories"
          defaultValue={vehicle?.categories}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#E07A5F]"
        >
          <option value="Sedan">Sedan</option>
          <option value="SUV">SUV</option>
          <option value="Electric">Electric</option>
          <option value="Van">Van</option>
        </select>
        <textarea
          name="description"
          defaultValue={vehicle?.description}
          placeholder="Description"
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#E07A5F]"
          rows={3}
          required
        />

        <button
          type="submit"
          className="btn-gradient"
        >
          Update
        </button>
      </form>
    </Motions>
  );
    
};

export default UpdateVehicle;