import { motion } from "framer-motion";

const Newsletter = () => {
  return (
    <section className=" container mx-auto px-4 dark:mb-5 dark:md:mb-12 bg-[#F4F1DE] dark:bg-[#1E293B]">
      <div className=" bg-[#F4F1DE] dark:bg-[#1E293B] rounded-2xl p-10 md:p-16 text-center relative overflow-hidden border border-gray-100 dark:border-gray-800 shadow-sm">
        
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#F2CC8F] opacity-20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-[#E07A5F] opacity-20 rounded-full blur-3xl"></div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative z-10"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#3D405B] dark:text-white">
            Get Special Offers!
          </h2>
          <p className="text-base md:text-lg mb-8 text-gray-600 dark:text-gray-400 font-medium">
            Subscribe to our newsletter and stay updated with the latest car deals and travel tips.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 max-w-lg mx-auto">
            <input 
              type="email" 
              placeholder="Enter your email address" 
              className="w-full px-6 py-3 rounded-full text-gray-800 focus:outline-none bg-white dark:bg-[#0F172A] border border-gray-200 dark:border-gray-700 dark:text-white"
            />
            <button className="bg-[#E07A5F] hover:bg-[#D35D42] text-white px-8 py-3 rounded-full font-bold transition-all w-full sm:w-auto shadow-md">
              Subscribe
            </button>
          </div>
          
          <p className="text-xs mt-4 text-gray-400">
            We value your privacy. No spam, ever.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Newsletter;