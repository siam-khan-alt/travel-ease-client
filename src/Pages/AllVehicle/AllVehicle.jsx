import React, {  useEffect, useState } from "react";
import useAxios from "../../Hooks/useAxios";
import VehicleCard from "../../Component/VehiclesCard";
import LoadingSpinner from "../../Component/LoadingSpinner";
import Motions from "../../Component/Motions";
import { FaSearch } from "react-icons/fa";
const AllVehicle = () => {
  const instanceAxios = useAxios();
  const [vehicles, setVehicles] = useState([]);
  const [Loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sortBy, setSortBy] = useState("");
  useEffect(() => {
    const fetchVehicles = async () => {
      setLoading(true);
      try {
        const { data } = await instanceAxios.get(
          `/vehicles?search=${search}&category=${category}&sortBy=${sortBy}`
        );
        setVehicles(data);
      } catch (error) {
        console.error("Error fetching vehicles", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVehicles();
  }, [instanceAxios, search, category, sortBy]);

  

  return (
    <Motions className="mx-auto container mt-7 pb-12 px-5">
      <h2 className="text-3xl my-4 text-center font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#E07A5F] to-[#F2CC8F] mb-6">
        All Vehicles
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8 bg-white dark:bg-[#1E293B] p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
        
        <div className="relative md:col-span-2">
          <FaSearch className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search by model or location..."
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#0F172A] dark:text-white focus:ring-2 focus:ring-[#E07A5F] outline-none"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="p-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#0F172A] dark:text-white outline-none"
        >
          <option value="">All Categories</option>
          <option value="Luxury">Luxury</option>
          <option value="SUV">SUV</option>
          <option value="Sedan">Sedan</option>
          <option value="Economy">Economy</option>
        </select>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="p-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#0F172A] dark:text-white outline-none"
        >
          <option value="">Sort By Price</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
        </select>
      </div>
      {Loading ? (
        <LoadingSpinner />
      ) : vehicles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {vehicles.map((vehicle) => (
            <VehicleCard vehicle={vehicle} key={vehicle._id} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <h3 className="text-xl text-gray-500">No vehicles found matching your criteria.</h3>
        </div>
      )}
    </Motions>
  );
};

export default AllVehicle;
