import React from "react";
import { motion } from "framer-motion";
import { FaAward, FaUsers, FaCar, FaHandshake, FaShieldAlt, FaClock, FaDollarSign } from "react-icons/fa";

const About = () => {
  const stats = [
    { icon: <FaCar />, count: "500+", label: "Luxury Cars", color: "text-blue-500" },
    { icon: <FaUsers />, count: "10k+", label: "Happy Clients", color: "text-orange-500" },
    { icon: <FaAward />, count: "15+", label: "Years Experience", color: "text-green-500" },
    { icon: <FaHandshake />, count: "150+", label: "Partner Cities", color: "text-purple-500" },
  ];

  const features = [
    {
      id: "01",
      icon: <FaShieldAlt />,
      title: "Verified Vehicles",
      desc: "Every car in our fleet undergoes a 50-point safety check.",
      bgColor: "bg-[#E07A5F]",
    },
    {
      id: "02",
      icon: <FaDollarSign />,
      title: "Transparent Pricing",
      desc: "No hidden fees, no surprises. Pay exactly what you see.",
      bgColor: "bg-[#3D405B]",
    },
    {
      id: "03",
      icon: <FaClock />,
      title: "24/7 Support",
      desc: "Our dedicated support team is always ready to assist you.",
      bgColor: "bg-[#F2CC8F]",
    },
  ];

  return (
    <div className="bg-[#F4F1DE] dark:bg-[#1E293B]  min-h-screen transition-colors duration-300">
      <section className="relative dark:py-5 dark:md:py-12 md:py-10  text-center overflow-hidden">
        <div className="absolute top-0 left-0 w-72 h-72 bg-[#E07A5F] opacity-10 dark:opacity-20 rounded-full -translate-x-1/3 -translate-y-1/3 blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-[#F2CC8F] opacity-10 dark:opacity-10 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl"></div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="container mx-auto px-4 relative z-10"
        >
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 text-[#3D405B] dark:text-white font-serif">
            About <span className="text-[#E07A5F]">TravelEase</span>
          </h1>
          <p className="text-lg md:text-xl text-[#3D405B]/80 dark:text-gray-300 max-w-3xl mx-auto font-medium">
            Your trusted partner in making every journey comfortable, affordable, and memorable. 
            We provide a premium fleet curated specifically for your travel needs.
          </p>
          <div className="mt-8 flex justify-center items-center gap-2">
            <div className="h-1.5 w-12 bg-[#E07A5F] rounded-full"></div>
            <div className="h-1.5 w-4 bg-[#F2CC8F] rounded-full"></div>
            <div className="h-1.5 w-12 bg-[#E07A5F] rounded-full"></div>
          </div>
        </motion.div>
      </section>

      <section className="py-12 container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative p-2 bg-white dark:bg-[#0F172A] rounded-2xl shadow-xl"
          >
            <img 
              src="https://i.ibb.co.com/m5NqrGD7/photo-1522071820081-009f0129c71c-auto-format-fit-crop-q-80-w-800.jpg" 
              alt="Our Team" 
              className="rounded-2xl w-full object-cover shadow-inner"
            />
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#E07A5F] to-[#F2CC8F] text-3xl">Our Mission & Vision</h2>
            <p className="text-[#3D405B]/70 dark:text-gray-400 text-lg leading-relaxed font-medium">
              At TravelEase, our mission is to redefine car rentals by providing a seamless, 
              technology-driven booking experience. We believe that everyone deserves a 
              premium ride without the premium price tag.
            </p>
            <div className="p-8 bg-white dark:bg-[#0F172A] rounded-2xl border-l-8 border-[#E07A5F] shadow-sm">
               <p className="italic text-[#3D405B] dark:text-gray-300 text-lg font-semibold">
                 "Whether it's a cross-country adventure or a simple city commute, we are 
                 committed to safety, quality, and exceptional customer service."
               </p>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="container mx-auto px-4 ">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div 
                key={index}
                whileHover={{ y: -10 }}
                className="bg-white dark:bg-[#0F172A] p-10 rounded-2xl shadow-sm text-center border border-gray-100 dark:border-gray-800 transition-all"
              >
                <div className={`${stat.color} text-4xl mb-4 flex justify-center`}>{stat.icon}</div>
                <h3 className="text-4xl font-extrabold text-[#3D405B] dark:text-white">{stat.count}</h3>
                <p className="text-gray-500 dark:text-gray-400 font-bold uppercase text-xs tracking-[0.2em] mt-3">{stat.label}</p>
              </motion.div>
            ))}
          </div>
      </section>

      <section className=" py-12 container mx-auto px-4 text-center">
        <h2 className="main-heading mb-6 ">Why Choose Us?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {features.map((feature, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.02 }}
              className="bg-white dark:bg-[#0F172A] p-10 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 group transition-all"
            >
              <div className={`w-16 h-16 ${feature.bgColor} text-white rounded-2xl flex items-center justify-center mx-auto mb-6 text-2xl shadow-lg transform  transition-transform`}>
                {feature.icon}
              </div>
              <h4 className="text-2xl font-bold mb-4 text-[#3D405B] dark:text-white">{feature.title}</h4>
              <p className="text-gray-500 dark:text-gray-400 font-medium leading-relaxed">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default About;