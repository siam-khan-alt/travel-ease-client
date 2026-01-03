import { motion } from "framer-motion";
import { FaQuoteLeft } from "react-icons/fa";

const Testimonials = () => {
  const reviews = [
    { 
      name: "Rahat Chowdhury", 
      role: "Business Consultant", 
      text: "The booking process was incredibly smooth. The SUV I rented was in top-notch condition and perfect for my business trip.", 
      img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200&h=200" 
    },
    { 
      name: "Tanvir Ahmed", 
      role: "Travel Enthusiast", 
      text: "Best rental prices I've found so far in Dhaka. Their customer service team helped me pick the right car for my family tour.", 
      img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200&h=200" 
    },
    { 
      name: "Siam Khan", 
      role: "Frequent Renter", 
      text: "Highly recommended! Huge variety of cars and very transparent pricing. No hidden charges at all, which is rare these days.", 
      img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200&h=200" 
    },
  ];
  return (
    <section className="mb-5 dark:mb-5 dark:md:mb-12 bg-[#F4F1DE] dark:bg-[#1E293B] ">
      <div className="container px-4 mx-auto">
        <h2 className="main-heading text-center mb-12 text-[#3D405B] dark:text-white">What Our Clients Say</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((rev, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -10 }}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="bg-white dark:bg-[#0F172A] p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 relative"
            >
              <FaQuoteLeft className="absolute top-4 right-6 text-3xl text-[#E07A5F] opacity-20" />
              
              <div className="flex items-center gap-4 mb-6">
                <img 
                  src={rev.img} 
                  alt={rev.name} 
                  className="w-14 h-14 rounded-full border-2 border-[#E07A5F] object-cover shadow-md" 
                  onError={(e) => { e.target.src = "https://cdn-icons-png.flaticon.com/512/3135/3135715.png" }} 
                />
                <div>
                  <h4 className="font-bold text-[#3D405B] dark:text-white">{rev.name}</h4>
                  <p className="text-xs text-[#E07A5F] font-semibold">{rev.role}</p>
                </div>
              </div>
              
              <p className="text-gray-600 dark:text-gray-400 italic text-sm leading-relaxed">
                "{rev.text}"
              </p>

              <div className="mt-4 flex text-yellow-500">
                {"★" .repeat(5)}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;