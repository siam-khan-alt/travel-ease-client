import { motion } from "framer-motion";
import { FaSearch, FaCalendarAlt, FaCarSide } from "react-icons/fa";

const HowItWorks = () => {
  const steps = [
    {
      icon: <FaSearch />,
      title: "Find Your Car",
      desc: "Search through our fleet of luxury and budget vehicles.",
      color: " text-blue-500",
    },
    {
      icon: <FaCalendarAlt />,
      title: "Pick Your Date",
      desc: "Select your pick-up and drop-off dates easily.",
      color: "text-orange-500",
    },
    {
      icon: <FaCarSide />,
      title: "Enjoy Your Drive",
      desc: "Complete booking and hit the road with comfort.",
      color: " text-green-500 ",
    },
  ];

  return (
    <section className="px-4 my-5 container mx-auto dark:md:my-12 bg-[#F4F1DE] dark:bg-[#1E293B] ">
      <div className="container mx-auto text-center">
        <h2 className="main-heading mb-16 text-[#3D405B] dark:text-white">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              whileHover={{ y: -10 }}
              className="bg-white dark:bg-[#0F172A] p-10 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 text-center flex flex-col items-center group transition-all"
            >
              <div className="w-20 h-20 rounded-full bg-[#F4F1DE] dark:bg-[#0F172A] flex items-center justify-center text-3xl shadow-md mb-6 border border-gray-100 dark:border-gray-700">
                <span className={step.color}>{step.icon}</span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-[#3D405B] dark:text-white">{step.title}</h3>
              <p className="text-gray-500 dark:text-gray-400 max-w-xs">{step.desc}</p>
            </motion.div>
          ))}
          <div className="hidden md:block absolute top-10 left-1/4 right-1/4 h-0.5 border-t-2 border-dashed border-gray-200 dark:border-gray-800 z-0"></div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;