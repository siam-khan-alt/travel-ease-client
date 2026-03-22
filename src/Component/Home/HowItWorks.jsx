import React from "react";
import { motion } from "framer-motion";
import { FiSearch, FiShield, FiCheckCircle, FiKey } from "react-icons/fi";

const HowItWorks = () => {
  const steps = [
    {
      id: "1",
      tag: "Curation",
      title: "Select Your Ride",
      desc: "Explore our hand-picked collection of world-class luxury vehicles.",
      width: "md:col-span-3",
      icon: <FiSearch size={24} />,
    },
    {
      id: "2",
      tag: "Verification",
      title: "Quick Protocol",
      desc: "Our streamlined system verifies your profile details for a seamless start.",
      width: "md:col-span-2",
      icon: <FiShield size={24} />,
    },
    {
      id: "3",
      tag: "Activation",
      title: "Instant Booking",
      desc: "Confirm your journey with a single tap. No paperwork, just efficiency.",
      width: "md:col-span-2",
      icon: <FiCheckCircle size={24} />,
    },
    {
      id: "4",
      tag: "Ignition",
      title: "The Experience",
      desc: "Grab the keys and redefine what it means to travel in style.",
      width: "md:col-span-3",
      icon: <FiKey size={24} />,
    },
  ];

  return (
    <section className="py-12 md:py-16 lg:py-20 bg-[var(--bg-main)]">
      <div className="container mx-auto px-6 ">
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-[var(--primary)] font-bold tracking-[0.4em] text-xs uppercase  mb-2"
          >
            Our Protocol
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-black text-gradient-gold  "
          >
            How It Works
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-5">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`${step.width} group relative min-h-[220px] rounded-2xl bg-[var(--card-bg)] border border-white/5 p-8 flex flex-col justify-between transition-all duration-500 hover:border-[var(--primary)]/30 overflow-hidden`}
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-[var(--primary)]/5 blur-[50px] rounded-full group-hover:opacity-100 opacity-0 transition-opacity" />

              <div className="flex justify-between items-start z-10">
                <div className="flex flex-col gap-4">
                  <div className="text-[var(--primary)] opacity-80 group-hover:scale-110 group-hover:opacity-100 transition-all duration-500">
                    {step.icon}
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-[1px] bg-[var(--primary)]" />
                    <span className="text-[var(--primary)] font-bold tracking-widest text-[10px] uppercase ">
                      {step.tag}
                    </span>
                  </div>
                </div>
                <span className="text-4xl text-gradient-gold opacity-[0.03] group-hover:opacity-10 transition-all">
                  {step.id}
                </span>
              </div>

              <div className="space-y-2 z-10">
                <h3 className="text-2xl md:text-3xl text-gradient-gold !text-left">
                  {step.title}
                </h3>
                <p className="text-[var(--text-main)] opacity-50 text-xs md:text-sm leading-relaxed max-w-xs">
                  {step.desc}
                </p>
              </div>

              <div className="absolute bottom-0 left-6 right-6 h-[1px] bg-gradient-to-r from-transparent via-[var(--primary)]/20 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;