import React, { use } from "react";
import { AuthContext } from "../../Context/AuthContext";
import useAxios from "../../Hooks/useAxios";
import { toast } from "react-toastify";
import { format } from "date-fns";
import Motions from "../../Component/Motions";
const AddVehicle = () => {
  const { users } = use(AuthContext);
  const instanceAxios = useAxios();

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const initialData = Object.fromEntries(formData.entries());
    const newVehicle = {
      ...initialData,
      pricePerDay: parseFloat(initialData.pricePerDay),
      sets: parseInt(initialData.sets),
      ratings: parseFloat(initialData.ratings),

      features: initialData.features.split(",").map((f) => f.trim()),
      rules: initialData.rules.split(",").map((r) => r.trim()),

      owner: users?.displayName || "User",
      userEmail: users?.email,
      createdAt: format(new Date(), "yyyy-MM-dd hh:mm:ss a"),
      bookingCount: 0,
    };
    instanceAxios
      .post("/vehicles", newVehicle)
      .then((res) => {
        if (res.data.insertedId) toast.success("Vehicle added successfully!");
        e.target.reset();
      })
      .catch((err) => toast.error(err.message));
  };

  return (
    <Motions className="max-w-2xl mx-auto p-6 mb-8   shadow-lg dark:dark:bg-[#0F172A] bg-base-100 rounded-xl mt-6">
      <h2 className="main-heading">Add Vehicle</h2>
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
            value={users?.displayName || "User"}
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <input
            type="text"
            name="coverImage"
            placeholder="Cover Image URL"
            className="border rounded-lg px-3 py-2"
            required
          />
          <input
            type="text"
            name="additionalImg1"
            placeholder="Gallery Image 1"
            className="border rounded-lg px-3 py-2"
            required
          />
          <input
            type="text"
            name="additionalImg2"
            placeholder="Gallery Image 2"
            className="border rounded-lg px-3 py-2"
            required
          />
        </div>
        <div className="flex flex-col md:flex-row md:space-x-3 space-y-4 md:space-y-0">
          <input
            type="text"
            name="features"
            placeholder="Features (e.g. AC, GPS, Bluetooth)"
            className="flex-1 border rounded-lg px-3 py-2"
            required
          />
          <input
            type="text"
            name="rules"
            placeholder="Rules (e.g. No Smoking, Valid NID)"
            className="flex-1 border rounded-lg px-3 py-2"
            required
          />
        </div>
        <div className="flex flex-col md:flex-row md:space-x-3 space-y-4 md:space-y-0">
          <div className="flex-1">
            <label className="text-xs font-semibold">Initial Rating</label>
            <select
              name="ratings"
              className="w-full border rounded-lg px-3 py-2"
            >
              <option value="5.0">5.0 (Excellent)</option>
              <option value="4.5">4.5 (Very Good)</option>
              <option value="4.0">4.0 (Good)</option>
            </select>
          </div>
          <div className="flex-1">
            <label className="text-xs font-semibold">Availability Status</label>
            <select
              name="availability"
              className="w-full border rounded-lg px-3 py-2"
            >
              <option value="Available">Available</option>
              <option value="Booked">Booked</option>
            </select>
          </div>
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

        <button type="submit" className="btn-gradient">
          Add Vehicle
        </button>
      </form>
    </Motions>
  );
};

export default AddVehicle;
