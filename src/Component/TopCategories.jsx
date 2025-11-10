import React from "react";
import { FaCarSide, FaBolt, FaShuttleVan, FaTaxi } from "react-icons/fa";

const categories = [
  { name: "SUVs", icon: <FaCarSide />, color: "from-[#7C3AED] to-[#6D28D9]" },
  { name: "Electric", icon: <FaBolt />, color: "from-[#06B6D4] to-[#3B82F6]" },
  {
    name: "Vans",
    icon: <FaShuttleVan />,
    color: "from-[#F59E0B] to-[#D97706]",
  },
  { name: "Sedans", icon: <FaTaxi />, color: "from-[#10B981] to-[#059669]" },
];

const TopCategories = () => {
  return (
    <div
      className=" bg-[#F4F1DE] dark:bg-[#0F172A]
text-[#1E293B] dark:text-white px-4 md:px-10 py-12 "
    >
      <h2 className="main-heading mb-10">
        Top Categories
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-5xl mx-auto">
        {categories.map((cat) => (
          <div
            key={cat.name}
            className={`bg-gradient-to-br ${cat.color} p-[1px] rounded-xl hover:scale-105 transition duration-300`}
          >
            <div
              className=" rounded-xl flex flex-col items-center justify-center bg-[#F4F1DE] dark:bg-[#1E293B] h-32 gap-3"
            >
              <span className="text-3xl">{cat.icon}</span>
              <p className="font-semibold">{cat.name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopCategories;
