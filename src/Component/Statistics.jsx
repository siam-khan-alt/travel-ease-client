import { motion } from "framer-motion";

const Statistics = () => {
  const stats = [
    { label: "Vehicles Available", value: "500+" },
    { label: "Happy Customers", value: "10k+" },
    { label: "Cities Covered", value: "150" },
    { label: "User Reviews", value: "4.9/5" },
  ];

  return (
    <section className="bg-[#F4F1DE] dark:bg-[#1E293B] mb-5 dark:md:mb-12 md:mb-10 px-4">
      <div className="container mx-auto">
          <h2 className="main-heading dark:my-5 mb-5 md:mb-6">
            Our Milestone & Achievements
          </h2>
          
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white dark:bg-[#0F172A] p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 transition-all"
            >
              <h3 className="text-3xl md:text-4xl font-bold text-[#E07A5F] dark:text-[#F2CC8F]">
                {stat.value}
              </h3>
              <p className="mt-2 text-[#3D405B] dark:text-gray-300 font-semibold text-sm md:text-base uppercase tracking-wider">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Statistics;