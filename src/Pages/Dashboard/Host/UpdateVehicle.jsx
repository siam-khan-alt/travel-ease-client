import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { FaCloudUploadAlt, FaTools, FaMapMarkerAlt } from "react-icons/fa";
import useAxios from "../../../Hooks/useAxios";
import LoadingSpinner from "../../../Component/shared/LoadingSpinner";
import DashboardHeader from "../../../Component/Dashboard/Common/DashboardHeader";

const allBrands = [
  "Mercedes",
  "BMW",
  "Audi",
  "Tesla",
  "Range Rover",
  "Jeep",
  "Porsche",
  "Toyota",
  "Lamborghini",
  "Ford",
];

const UpdateVehicle = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxios();

  // Fetch current vehicle data
  const { data: vehicle, isLoading } = useQuery({
    queryKey: ["vehicle", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/vehicles/${id}`);
      return res.data;
    },
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (updatedVehicle) => {
      const { data } = await axiosSecure.patch(
        `/vehicles/${id}`,
        updatedVehicle
      );
      return data;
    },
    onSuccess: () => {
      toast.success("VEHICLE ASSET UPDATED!");
      navigate("/dashboard/my-listings");
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    const updatedVehicle = {
      ...data,
      pricePerDay: parseFloat(data.pricePerDay),
      sets: parseInt(data.sets),
      features: data.features.split(",").map((f) => f.trim()),
      rules: data.rules.split(",").map((r) => r.trim()),
    };

    await mutateAsync(updatedVehicle);
  };

  if (isLoading) return <LoadingSpinner />;

  const inputStyle = `w-full bg-[var(--bg-main)] border border-[var(--primary)]/20 rounded-xl px-4 py-3 text-sm focus:border-[var(--primary)] outline-none text-[var(--text-main)]`;
  const labelStyle =
    "text-[10px] uppercase tracking-[0.2em] font-black text-[var(--primary)] mb-2 block ml-1";

  return (
    <div className="pb-10">
      <DashboardHeader
        title="Update Asset"
        subtitle={`Modify Specifications for ${
          vehicle?.vehicleName || "Vehicle"
        }`}
        role="host"
        Icon={FaTools}
        statusText="Configuration Mode"
      />

      <form
        onSubmit={handleSubmit}
        className="bg-[var(--card-bg)] border border-[var(--primary)]/10 rounded-2xl p-8 shadow-sm"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className={labelStyle}>Asset Designation</label>
            <input
              type="text"
              name="vehicleName"
              defaultValue={vehicle?.vehicleName}
              className={inputStyle}
              required
            />
          </div>
          <div>
            <label className={labelStyle}>Daily Rate (USD)</label>
            <input
              type="number"
              name="pricePerDay"
              defaultValue={vehicle?.pricePerDay}
              className={inputStyle}
              required
            />
          </div>
          <div>
            <label className={labelStyle}>Location</label>
            <input
              type="text"
              name="location"
              defaultValue={vehicle?.location}
              className={inputStyle}
              required
            />
          </div>
          <div>
            <label className={labelStyle}>Class Category</label>
            <select
              name="categories"
              defaultValue={vehicle?.categories}
              className={inputStyle}
            >
              <option value="Luxury">Luxury</option>
              <option value="SUV">SUV</option>
              <option value="Sedan">Sedan</option>
              <option value="Sports">Sports</option>
              <option value="Electric">Electric</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <div>
            <label className={labelStyle}>Capacity</label>
            <input
              type="number"
              name="sets"
              defaultValue={vehicle?.sets}
              className={inputStyle}
              required
            />
          </div>
          <div>
            <label className={labelStyle}>Availability</label>
            <select
              name="availability"
              defaultValue={vehicle?.availability}
              className={inputStyle}
            >
              <option value="Available">Available</option>
              <option value="Maintenance">Maintenance</option>
            </select>
          </div>
          <div>
            <label className={labelStyle}>Brand</label>
            <select
              name="brand"
              defaultValue={vehicle?.brand}
              className={inputStyle}
            >
              {allBrands.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-6">
          <label className={labelStyle}>Cover Image URL</label>
          <input
            type="text"
            name="coverImage"
            defaultValue={vehicle?.coverImage}
            className={inputStyle}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div>
            <label className={labelStyle}>Features (Comma Separated)</label>
            <textarea
              name="features"
              defaultValue={vehicle?.features?.join(", ")}
              className={`${inputStyle} h-24`}
            />
          </div>
          <div>
            <label className={labelStyle}>Rules (Comma Separated)</label>
            <textarea
              name="rules"
              defaultValue={vehicle?.rules?.join(", ")}
              className={`${inputStyle} h-24`}
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="btn-gradient mt-10 w-full md:w-auto min-w-[200px]"
        >
          {isPending ? "UPDATING..." : "UPDATE ASSET"}
        </button>
      </form>
    </div>
  );
};

export default UpdateVehicle;
