import React, { use, useEffect, useState } from "react";
import useAxios from "../../Hooks/useAxios";
import VehicleCard from "../../Component/VehiclesCard";
import { AuthContext } from "../../Context/AuthContext";
import LoadingSpinner from "../../Component/LoadingSpinner";
import Motions from "../../Component/Motions";
const AllVehicle = () => {
  const { loading } = use(AuthContext);
  const instanceAxios = useAxios();
  const [vehicles, setVehicles] = useState([]);
  const [sortBy, setSortBy] = useState("");
  useEffect(() => {
    instanceAxios.get("/vehicles").then((data) => {
      setVehicles(data.data); console.log(data.data);
      
    });
  }, [instanceAxios]);
  const sortVehicles = [...vehicles].sort((a, b) => {
    if (sortBy === "price-asc") return a.pricePerDay - b.pricePerDay;
    if (sortBy === "price-desc") return b.pricePerDay - a.pricePerDay;
    if (sortBy === "category") return a.categories.localeCompare(b.categories);
    if (sortBy === "location") return a.location.localeCompare(b.location);
    return 0;
  });

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <Motions className="mx-auto container px-5">
      <h2 className="text-3xl my-4 text-center font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#E07A5F] to-[#F2CC8F] mb-6">
        All Vehicles
      </h2>
      <div className="flex justify-center md:justify-end gap-4 mb-4">
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="p-2 rounded border border-gray-300"
        >
          <option value="">Sort By</option>
          <option value="price-asc">Price: Low → High</option>
          <option value="price-desc">Price: High → Low</option>
          <option value="category">Category</option>
          <option value="location">Location</option>
        </select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {sortVehicles.map((vehicle) => (
          <VehicleCard vehicle={vehicle} key={vehicle._id}></VehicleCard>
        ))}
      </div>
    </Motions>
  );
};

export default AllVehicle;
