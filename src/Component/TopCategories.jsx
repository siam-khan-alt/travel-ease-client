import React from "react";
import { motion } from "framer-motion";
import { FaCarSide, FaBolt, FaShuttleVan, FaTaxi } from "react-icons/fa";

const categories = [
  { name: "SUVs", icon: <FaCarSide />},
  { name: "Electric", icon: <FaBolt /> },
  {
    name: "Vans",
    icon: <FaShuttleVan />
  },
  { name: "Sedans", icon: <FaTaxi /> },
];

const TopCategories = () => {
  const categoryVariants = {
  hidden: { opacity: 0, y: 30 }, 
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.4, ease: "easeOut" }
  },
};
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.5,
    },
  },
};
  return (
    <div
      className=" bg-[#F4F1DE] dark:bg-[#1E293B]
text-[#1E293B] dark:text-white container mx-auto px-4  dark:mb-5 dark:md:mb-12 md:mb-10"
    >
      <h2 className="main-heading dark:my-5 mb-5 md:mb-6 ">
        Top Categories
      </h2>

      <motion.div  className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-5xl mx-auto"   variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}>
        {categories.map((cat) => (
          <motion.div
            key={cat.name}
             variants={categoryVariants}
            className=" rounded-2xl hover:scale-105 transition duration-300"
          >
            <div
              className=" rounded-2xl flex flex-col items-center justify-center bg-white dark:bg-[#0F172A] h-32 gap-3"
            >
              <span className="text-3xl">{cat.icon}</span>
              <p className="font-semibold">{cat.name}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default TopCategories;
