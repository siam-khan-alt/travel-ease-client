import React from "react";
import { useLoaderData } from "react-router-dom";
import useAxios from "../Hooks/useAxios";
import { toast } from "react-toastify";
import { format } from "date-fns";
import Motions from "./Motions";

const UpdateVehicle = () => {
  const vehicle = useLoaderData();
  const instanceAxios = useAxios();
  const handleUpdate = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
        const initialData = Object.fromEntries(formData.entries());
    const updatedVehicle = {
            ...initialData,
            pricePerDay: parseFloat(initialData.pricePerDay),
            sets: parseInt(initialData.sets),
            ratings: parseFloat(initialData.ratings),
            features: initialData.features.split(",").map((f) => f.trim()),
            rules: initialData.rules.split(",").map((r) => r.trim()),
            updatedAt: format(new Date(), "yyyy-MM-dd hh:mm:ss a"),
        };
    instanceAxios
      .patch(`/vehicles/${vehicle?._id}`, updatedVehicle)
      .then(() => {
        toast.success("Vehicle updated successfully!");
      })
      .catch((err) => toast.error(err.message));
  };

  return (
    <Motions className="min-h-screen bg-[#F4F1DE] dark:bg-[#1E293B] py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white dark:bg-[#0F172A] shadow-2xl rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-800">
        <div className=" pt-6">
          <h2 className="main-heading tracking-tight">
            Update Vehicle Info
          </h2>
          <p className="text-transparent bg-clip-text bg-gradient-to-r from-[#E07A5F] to-[#F2CC8F] text-center font-semibold text-xl mt-1">
            Editing Details for: {vehicle?.vehicleName}
          </p>
        </div>

        <form className="p-8 space-y-4" onSubmit={handleUpdate}>
          <div className="flex flex-col md:flex-row md:space-x-3 space-y-4 md:space-y-0">
            <div className="flex-1 space-y-1">
              <label className="text-xs font-bold uppercase text-gray-400 ml-1">
                Vehicle Name
              </label>
              <input
                type="text"
                name="vehicleName"
                defaultValue={vehicle?.vehicleName}
                className="w-full border border-gray-200 dark:border-gray-700 dark:bg-[#1E293B] rounded-xl px-4 py-2 focus:ring-2 focus:ring-[#E07A5F] outline-none"
                required
              />
            </div>
            <div className="flex-1 space-y-1">
              <label className="text-xs font-bold uppercase text-gray-400 ml-1">
                Owner
              </label>
              <input
                type="text"
                name="owner"
                defaultValue={vehicle?.owner}
                className="w-full border border-gray-200 dark:border-gray-700 dark:bg-[#1E293B] rounded-xl px-4 py-2 focus:ring-2 focus:ring-[#E07A5F] outline-none bg-gray-50 dark:bg-gray-800"
                readOnly
              />
            </div>
          </div>

          <div className="flex flex-col md:flex-row md:space-x-3 space-y-4 md:space-y-0">
            <div className="flex-1 space-y-1">
              <label className="text-xs font-bold uppercase text-gray-400 ml-1">
                Contact Email
              </label>
              <input
                type="email"
                name="userEmail"
                defaultValue={vehicle?.userEmail}
                className="w-full border border-gray-200 dark:border-gray-700 dark:bg-[#1E293B] rounded-xl px-4 py-2 focus:ring-2 focus:ring-[#E07A5F] outline-none bg-gray-50 dark:bg-gray-800"
                readOnly
              />
            </div>
            <div className="flex-1 space-y-1">
              <label className="text-xs font-bold uppercase text-gray-400 ml-1">
                Price Per Day ($)
              </label>
              <input
                type="number"
                name="pricePerDay"
                min={1}
                defaultValue={vehicle?.pricePerDay}
                className="w-full border border-gray-200 dark:border-gray-700 dark:bg-[#1E293B] rounded-xl px-4 py-2 focus:ring-2 focus:ring-[#E07A5F] outline-none"
                required
              />
            </div>
          </div>

          <div className="flex flex-col md:flex-row md:space-x-3 space-y-4 md:space-y-0">
            <div className="flex-1 space-y-1">
              <label className="text-xs font-bold uppercase text-gray-400 ml-1">
                Location
              </label>
              <input
                type="text"
                name="location"
                defaultValue={vehicle?.location}
                className="w-full border border-gray-200 dark:border-gray-700 dark:bg-[#1E293B] rounded-xl px-4 py-2 focus:ring-2 focus:ring-[#E07A5F] outline-none"
                required
              />
            </div>
            <div className="flex-1 space-y-1">
              <label className="text-xs font-bold uppercase text-gray-400 ml-1">
                Seats
              </label>
              <input
                type="number"
                name="seats"
                min={1}
                defaultValue={vehicle?.seats}
                className="w-full border border-gray-200 dark:border-gray-700 dark:bg-[#1E293B] rounded-xl px-4 py-2 focus:ring-2 focus:ring-[#E07A5F] outline-none"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-bold uppercase text-gray-400 ml-1">
                Cover URL
              </label>
              <input
                type="text"
                name="coverImage"
                defaultValue={vehicle?.coverImage}
                className="w-full border border-gray-200 dark:border-gray-700 dark:bg-[#1E293B] rounded-xl px-3 py-2 focus:ring-2 focus:ring-[#E07A5F] outline-none"
                required
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold uppercase text-gray-400 ml-1">
                Image 2 URL
              </label>
              <input
                type="text"
                name="additionalImg1"
                defaultValue={vehicle?.additionalImg1}
                className="w-full border border-gray-200 dark:border-gray-700 dark:bg-[#1E293B] rounded-xl px-3 py-2 focus:ring-2 focus:ring-[#E07A5F] outline-none"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold uppercase text-gray-400 ml-1">
                Image 3 URL
              </label>
              <input
                type="text"
                name="additionalImg2"
                defaultValue={vehicle?.additionalImg2}
                className="w-full border border-gray-200 dark:border-gray-700 dark:bg-[#1E293B] rounded-xl px-3 py-2 focus:ring-2 focus:ring-[#E07A5F] outline-none"
              />
            </div>
          </div>

          <div className="flex flex-col md:flex-row md:space-x-3 space-y-4 md:space-y-0">
            <div className="flex-1 space-y-1">
              <label className="text-xs font-bold uppercase text-gray-400 ml-1">
                Features (comma separated)
              </label>
              <input
                type="text"
                name="features"
                defaultValue={vehicle?.features?.join(", ")}
                className="w-full border border-gray-200 dark:border-gray-700 dark:bg-[#1E293B] rounded-xl px-4 py-2 focus:ring-2 focus:ring-[#E07A5F] outline-none"
                required
              />
            </div>
            <div className="flex-1 space-y-1">
              <label className="text-xs font-bold uppercase text-gray-400 ml-1">
                Rules (comma separated)
              </label>
              <input
                type="text"
                name="rules"
                defaultValue={vehicle?.rules?.join(", ")}
                className="w-full border border-gray-200 dark:border-gray-700 dark:bg-[#1E293B] rounded-xl px-4 py-2 focus:ring-2 focus:ring-[#E07A5F] outline-none"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-bold uppercase text-gray-400 ml-1">
                Rating
              </label>
              <select
                name="ratings"
                defaultValue={vehicle?.ratings}
                className="w-full border border-gray-200 dark:border-gray-700 dark:bg-[#1E293B] rounded-xl px-3 py-2 focus:ring-2 focus:ring-[#E07A5F] cursor-pointer"
              >
                <option value="5.0">5.0 (Excellent)</option>
                <option value="4.5">4.5 (Very Good)</option>
                <option value="4.0">4.0 (Good)</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold uppercase text-gray-400 ml-1">
                Availability
              </label>
              <select
                name="availability"
                defaultValue={vehicle?.availability}
                className="w-full border border-gray-200 dark:border-gray-700 dark:bg-[#1E293B] rounded-xl px-3 py-2 focus:ring-2 focus:ring-[#E07A5F] cursor-pointer"
              >
                <option value="Available">Available</option>
                <option value="Booked">Booked</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold uppercase text-gray-400 ml-1">
                Category
              </label>
              <select
                name="categories"
                defaultValue={vehicle?.categories}
                className="w-full border border-gray-200 dark:border-gray-700 dark:bg-[#1E293B] rounded-xl px-3 py-2 focus:ring-2 focus:ring-[#E07A5F] cursor-pointer"
              >
                <option value="Sedan">Sedan</option>
                <option value="SUV">SUV</option>
                <option value="Electric">Electric</option>
                <option value="Van">Van</option>
              </select>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold uppercase text-gray-400 ml-1">
              Description
            </label>
            <textarea
              name="description"
              defaultValue={vehicle?.description}
              rows={3}
              className="w-full border border-gray-200 dark:border-gray-700 dark:bg-[#1E293B] rounded-xl px-4 py-2 focus:ring-2 focus:ring-[#E07A5F] outline-none resize-none"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-4 rounded-xl bg-[#E07A5F] hover:bg-[#d46a4f] text-white font-bold text-lg shadow-lg shadow-orange-500/20 transition-all active:scale-95 mt-4"
          >
            Save Changes
          </button>
        </form>
      </div>
    </Motions>
  );
};

export default UpdateVehicle;
