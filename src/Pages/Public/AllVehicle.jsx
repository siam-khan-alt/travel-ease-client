import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../Component/shared/LoadingSpinner";
import { FaSearch, FaFilter, FaSortAmountDown, FaTimes, FaCarSide } from "react-icons/fa";
import useAxios from "../../Hooks/useAxios";
import VehicleCard from "../../Component/Card/VehiclesCard";
import Motions from "../../Component/Motions";

const AllVehicle = () => {
  const instanceAxios = useAxios();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sortBy, setSortBy] = useState("");

  const { data: vehicles = [], isLoading, isFetching } = useQuery({
    queryKey: ["vehicles", search, category, sortBy],
    queryFn: async () => {
      const { data } = await instanceAxios.get(
        `/vehicles?search=${search}&category=${category}&sortBy=${sortBy}`
      );
      return data;
    },
    keepPreviousData: true,
  });

  const resetFilters = () => {
    setSearch("");
    setCategory("");
    setSortBy("");
  };


  return (
    <Motions className="mx-auto container mt-10 pb-20 px-6">
      <div className="text-center mb-16">
        <p className="text-[10px] uppercase tracking-[0.5em] text-[var(--primary)] font-bold mb-3">
          Our Fleet
        </p>
        <h2 className="main-heading">Explore All Vehicles</h2>
        <div className="w-24 h-[1px] bg-[var(--primary)]/30 mx-auto mt-4"></div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <aside className="w-full lg:w-80 shrink-0">
          <div className="sticky top-20 space-y-8 bg-[var(--card-bg)] border border-white/5 p-8 rounded-2xl shadow-xl">
            {/* search */}
            <div className="space-y-4">
              <h3 className="text-[var(--primary)] text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                <FaSearch className="text-[10px]" /> Quick Search
              </h3>
              <input
                type="text"
                value={search}
                placeholder="Model or Brand..."
                className="w-full px-5 py-3.5 rounded-2xl border border-white/10 bg-[var(--bg-main)] text-[var(--text-main)] focus:ring-1 focus:ring-[var(--primary)]/30 outline-none text-sm transition-all"
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
             {/* filter */}
            <div className="space-y-4">
              <h3 className="text-[var(--primary)] text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                <FaFilter className="text-[10px]" /> Category
              </h3>
              <div className="flex flex-col gap-2">
                {["Luxury", "SUV", "Sedan", "Economy"].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setCategory(category === cat ? "" : cat)}
                    className={`text-left px-5 py-3.5 rounded-2xl text-[11px] font-bold uppercase tracking-wider transition-all border ${
                      category === cat 
                      ? "bg-[var(--primary)] text-black border-[var(--primary)] shadow-lg shadow-[var(--primary)]/20" 
                      : "bg-[var(--bg-main)]/50 text-[var(--text-main)] opacity-70 border-transparent hover:border-[var(--primary)]/30"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Sort Filter */}
            <div className="space-y-4">
              <h3 className="text-[var(--primary)] text-xs font-bold uppercase tracking-widest  flex items-center gap-2">
                <FaSortAmountDown className="text-[10px]" /> Sort By Price
              </h3>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-white/5 bg-[var(--bg-main)] text-[var(--text-main)] cursor-pointer outline-none text-xs font-semibold uppercase select select-accent"
              >
                <option value="">Default Sorting</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>

            <button 
              onClick={resetFilters}
              className="w-full py-3.5 rounded-2xl border border-[var(--primary)]/20 text-[var(--primary)] text-[10px] uppercase font-bold tracking-[0.2em] hover:bg-[var(--primary)] hover:text-black transition-all flex items-center justify-center gap-2 active:scale-95"
            >
              <FaTimes /> Reset Filters
            </button>
          </div>
        </aside>

        <div className="flex-1 relative min-h-[500px]">
          
          {isLoading ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <LoadingSpinner />
            </div>
          ) : (
            <>
          {isFetching && (
                <div className="absolute inset-0 z-30 bg-[var(--bg-main)]/40 backdrop-blur-[2px] rounded-3xl flex items-center justify-center">
                  <Motions
                    animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                    className="flex flex-col items-center gap-3 bg-[var(--card-bg)] p-8 rounded-3xl border border-[var(--primary)]/20 shadow-2xl"
                  >
                    <FaCarSide className="text-4xl text-[var(--primary)]" />
                    <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-[var(--primary)]">Updating Fleet...</span>
                  </Motions>
                </div>
              )}
          {vehicles.length > 0 ? (
                <div className="flex flex-col gap-6">
                  {vehicles.map((vehicle, index) => (
                    <VehicleCard 
                      key={vehicle._id} 
                      vehicle={vehicle} 
                      isReverse={index % 2 !== 0} 
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-32 border border-dashed border-white/10 rounded-2xl flex flex-col items-center justify-center h-full">
                  <h3 className="text-xl font-bold text-[var(--text-main)]/30 uppercase tracking-widest">
                    No Vehicles Found
                  </h3>
                  <p className="text-xs text-[var(--text-main)]/40 mt-2 italic">Try adjusting your filters or search terms</p>
                  <button onClick={resetFilters} className="text-[var(--primary)] text-[10px] mt-6 uppercase font-bold border-b border-[var(--primary)]/40 hover:border-[var(--primary)] transition-all">
                    Clear all filters
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </Motions>
  );
};

export default AllVehicle;