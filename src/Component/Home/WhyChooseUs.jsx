import React from "react";
import { motion } from "framer-motion";

const WhyChooseUs = () => {
  const features = [
    {
      id: 1,
      title: "Diverse Fleet of Prestige Vehicles",
      desc: "Explore high-performance, comfortable, and elegant cars tailored to your specific preferences and lifestyle.",
    },
    {
      id: 2,
      title: "Concierge-Level Service",
      desc: "Enjoy a seamless rental experience, from an easy booking process to prompt delivery at your preferred location.",
    },
    {
      id: 3,
      title: "Flexible Lifestyle Plans",
      desc: "We offer daily, weekly, and monthly rental options with convenient payment solutions to fit your needs.",
    },
    {
      id: 4,
      title: "Total Peace of Mind",
      desc: "We prioritize top-tier service and exceptional vehicle quality, ensuring a smooth and luxurious driving experience.",
    },
  ];

  return (
    <section className="py-12 md:py-16 lg:py-20 bg-[var(--bg-main)] transition-colors duration-500">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          {/* Left Content */}
          <div className="lg:sticky lg:top-32">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-2 h-2 rounded-full bg-[var(--primary)] shadow-[0_0_10px_var(--primary)]"></div>
              <span className="text-[var(--primary)] font-bold tracking-[0.3em] uppercase text-xs">
                Why Choose Us
              </span>
            </div>
            
            <h2 className="main-heading !text-left mb-6 leading-tight">
              Redefining Luxury Mobility <br /> with Distinction
            </h2>
            
            <p className="text-[var(--text-main)] opacity-70 mb-10 max-w-lg leading-relaxed">
              Choosing us means unlocking unmatched luxury, trusted service, and a 
              flawless driving experience—down to the finest detail. Our platform 
              empowers users, hosts, and admins with a seamless management system.
            </p>

            <button className="btn-gradient">
              Learn More
            </button>
          </div>

          {/* Right Features List  */}
          <div className="relative">
            <div className="absolute left-6 top-0 bottom-0 w-[1px] bg-gradient-to-b from-[var(--primary)] via-[var(--primary)]/20 to-transparent hidden md:block"></div>

            <div className="space-y-8">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.id}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative pl-0 md:pl-16 group"
                >
                  {/* Step Number Dot */}
                  <div className="absolute left-3.5 md:left-3 -translate-x-1/2 top-0 w-6 h-6 rounded-full bg-[var(--bg-main)] border border-[var(--primary)] flex items-center justify-center z-10 hidden md:flex transition-all duration-500 group-hover:bg-[var(--primary)] group-hover:shadow-[0_0_15px_var(--primary)]">
                    <span className="text-[10px] font-bold text-[var(--primary)] group-hover:text-[var(--bg-main)]">
                      {feature.id}
                    </span>
                  </div>

                  <div className="bg-[var(--card-bg)] p-8 rounded-2xl border border-white/5 shadow-2xl transition-all duration-500 hover:border-[var(--primary)]/30 group-hover:-translate-y-1">
                    <h3 className="text-xl font-bold mb-3 text-[var(--text-main)] group-hover:text-[var(--primary)] transition-colors duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-[var(--text-main)] opacity-60 text-sm leading-relaxed">
                      {feature.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;