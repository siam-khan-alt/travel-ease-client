import React, { useContext } from "react";
import { AuthContext } from "../../../Context/AuthContext";
import useAxios from "../../../Hooks/useAxios";
import { toast } from "react-toastify";
import { format } from "date-fns";
import { useMutation } from "@tanstack/react-query";
import {
  FaCar,
  FaCloudUploadAlt,
  FaTools,
  FaMapMarkerAlt,
} from "react-icons/fa";
import Swal from "sweetalert2";

const allBrands = [
  { name: "Mercedes", cat: "Luxury" },
  { name: "BMW", cat: "Luxury" },
  { name: "Audi", cat: "Luxury" },
  { name: "Tesla", cat: "Electric" },
  { name: "Range Rover", cat: "SUV" },
  { name: "Jeep", cat: "SUV" },
  { name: "Porsche", cat: "Sports" },
  { name: "Toyota", cat: "Luxury" },
  { name: "Lamborghini", cat: "Sports" },
  { name: "Ford", cat: "SUV" },
];

const AddVehicle = () => {
  const { users } = useContext(AuthContext);
  const axiosSecure = useAxios();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (newVehicle) => {
      const { data } = await axiosSecure.post("/vehicles", newVehicle);
      return data;
    },
    onSuccess: () => {
      toast.success("VEHICLE ASSET REGISTERED SUCCESSFULLY!");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const initialData = Object.fromEntries(formData.entries());

    const newVehicle = {
      ...initialData,
      pricePerDay: parseFloat(initialData.pricePerDay),
      sets: parseInt(initialData.sets),
      ratings: 0,
      totalStars: 0,
      totalReviews: 0,
      features: initialData.features.split(",").map((f) => f.trim()),
      rules: initialData.rules.split(",").map((r) => r.trim()),
      owner: users?.displayName || "User",
      userEmail: users?.email,
      createdAt: format(new Date(), "yyyy-MM-dd hh:mm:ss a"),
      bookingCount: 0,
      status: "pending",
    };

    await mutateAsync(newVehicle);
    form.reset();

    Swal.fire({
      title: "ASSET SUBMITTED!",
      text: "Your vehicle is in the safety check queue. Admin will verify soon.",
      icon: "info",
      confirmButtonColor: "var(--primary)",
      background: "var(--card-bg)",
      color: "var(--text-main)"
    });
  };

  // Common input styles to match your CSS
  const inputStyle =
    `
  w-full select bg-[var(--bg-main)] 
  border border-[var(--primary)]/20 
  rounded-xl px-4 py-3 text-sm 
  focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)] 
  outline-none transition-all 
  text-[var(--text-main)]
  cursor-pointer
`;
  const labelStyle =
    "text-[10px] uppercase tracking-[0.2em] font-black text-[var(--primary)] mb-2 block ml-1";

  return (
    <div className=" pb-10">
      {/* Header Section */}
      <div className="mb-10 ">
        <h1 className="text-3xl font-black uppercase tracking-tighter text-gradient-gold !text-center md:!text-left">
          {" "}
          Asset Registration
        </h1>
        <p className="text-[var(--text-main)]/40 text-xs font-bold tracking-[0.3em] !text-center md:!text-left uppercase mt-1">
          Deploy New Vehicle to the Elite Fleet
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-[var(--card-bg)] border border-[var(--primary)]/10 rounded-2xl p-8 shadow-sm relative overflow-hidden"
      >
        {/* Subtle Background Glow */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-[var(--primary)]/5 blur-[100px] pointer-events-none"></div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Vehicle Name */}
          <div>
            <label className={labelStyle}>Asset Designation</label>
            <input
              type="text"
              name="vehicleName"
              placeholder="e.g. BMW M4 Competition"
              className={inputStyle}
              required
            />
          </div>

          {/* Price */}
          <div>
            <label className={labelStyle}>Daily Rate (USD)</label>
            <input
              type="number"
              name="pricePerDay"
              placeholder="0.00"
              className={inputStyle}
              required
            />
          </div>

          {/* Location */}
          <div>
            <label className={labelStyle}>Strategic Location</label>
            <div className="relative">
              <FaMapMarkerAlt className="absolute right-4 top-4 text-[var(--primary)]/30" />
              <input
                type="text"
                name="location"
                placeholder="e.g. Dhaka, BD"
                className={inputStyle}
                required
              />
            </div>
          </div>

          {/* Category */}
          <div>
            <label className={labelStyle}>Class Category</label>
            <select
              name="categories"
              className={`${inputStyle} appearance-none`}
            >
              <option value="Luxury">Luxury</option>
              <option value="SUV">SUV</option>
              <option value="Sedan">Sedan</option>
              <option value="Sports">Sports</option>
              <option value="Electric">Electric</option>
            </select>
          </div>
        </div>

        {/* Technical Specs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <div>
            <label className={labelStyle}>Capacity (Seats)</label>
            <input type="number" name="sets" className={inputStyle} required />
          </div>
          <div>
            <label className={labelStyle}>Availability</label>
            <select name="availability" className={inputStyle}>
              <option value="Available">Instant Deploy</option>
              <option value="Maintenance">Maintenance</option>
            </select>
          </div>
          {/* Brand Selection */}
          <div>
            <label className={labelStyle}>Elite Brand</label>
            <select name="brand" className={inputStyle} required>
              <option value="" disabled selected>
                Select Brand
              </option>
              {allBrands.map((brand, idx) => (
                <option key={idx} value={brand.name}>
                  {brand.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Imagery Section */}
        <div className="mt-10 p-6 border border-dashed border-[var(--primary)]/20 rounded-2xl bg-[var(--primary)]/[0.02]">
          <h3 className="text-xs font-black uppercase tracking-widest mb-4 flex items-center gap-2">
            <FaCloudUploadAlt /> Visual Assets (URLs)
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="text"
              name="coverImage"
              placeholder="Primary Image"
              className={inputStyle}
              required
            />
            <input
              type="text"
              name="additionalImg1"
              placeholder="Angle 02"
              className={inputStyle}
              required
            />
            <input
              type="text"
              name="additionalImg2"
              placeholder="Interior"
              className={inputStyle}
              required
            />
          </div>
        </div>

        {/* Features & Rules */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div>
            <label className={labelStyle}>
              Core Features (Comma Separated)
            </label>
            <textarea
              name="features"
              placeholder="AC, Turbo, Autopilot..."
              className={`${inputStyle} h-24 resize-none`}
              required
            />
          </div>
          <div>
            <label className={labelStyle}>Fleet Rules (Comma Separated)</label>
            <textarea
              name="rules"
              placeholder="No Smoking, License Required..."
              className={`${inputStyle} h-24 resize-none`}
              required
            />
          </div>
        </div>

        {/* Description */}
        <div className="mt-6">
          <label className={labelStyle}>Asset Description</label>
          <textarea
            name="description"
            rows="4"
            className={`${inputStyle} resize-none`}
            placeholder="Provide a detailed overview of the vehicle's capabilities..."
            required
          />
        </div>

        {/* Action Button */}
        <div className="mt-10 flex justify-center md:justify-end">
          <button
            type="submit"
            disabled={isPending}
            className={`btn-gradient w-full md:w-auto min-w-[200px] flex items-center justify-center gap-2 ${
              isPending ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isPending ? (
              <span className="loading loading-spinner loading-xs text-black"></span>
            ) : (
              <FaTools />
            )}
            {isPending ? "REGISTERING..." : "DEPLOY ASSET"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddVehicle;
