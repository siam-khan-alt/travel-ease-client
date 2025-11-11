import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const HeroBanner = () => {
   const containerVariants = {
    hidden: { opacity: 0 ,y:30},
    visible: { 
      opacity: 1, y:0, 
      transition: {duration: 1, ease: "easeOut"} 
    },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div className="relative mt-0 md:mt-5 container mx-auto md:min-h-[70vh] min-h-[60vh] flex items-center justify-center text-center text-white"
    variants={containerVariants}
      initial="hidden"
      animate="visible">
      <div className="absolute inset-0">
        <img
          src="https://i.ibb.co.com/Mx1JPG9M/ev-running-costs.jpg"
          alt=""
          className="w-full h-full brightness-100 dark:brightness-50 object-cover"
        />
        <div className="absolute inset-0 bg-black/50"></div>
      </div>
      <div className="relative z-10 px-4">
        <motion.h2 className="text-5xl md:text-6xl font-bold mb-4"
        variants={childVariants}>
          Find Your Perfect Ride!
        </motion.h2>
        <motion.p className="text-lg md:text-xl mb-8 text-gray-200 max-w-2xl mx-auto" variants={childVariants}>
          Explore a variety of vehicles and book your next trip with ease and
          comfort.
        </motion.p>

        <div className="flex justify-center" variants={childVariants}>
         <motion.button className="btn-gradient max-w-[300px]"
         whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        variants={childVariants}> <Link to="/allVehicles" >
            View All Vehicles
          </Link></motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default HeroBanner;
