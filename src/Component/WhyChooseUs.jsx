import { FaShieldAlt, FaClock, FaTags, FaMapMarkedAlt } from "react-icons/fa";

const WhyChooseUs = () => {
  const features = [
    { icon: <FaShieldAlt />, title: "Fully Insured", desc: "Your safety is our priority with comprehensive coverage." },
    { icon: <FaClock />, title: "24/7 Support", desc: "Our team is always here to help you anytime, anywhere." },
    { icon: <FaTags />, title: "Best Prices", desc: "Affordable rentals with no hidden charges guaranteed." },
    { icon: <FaMapMarkedAlt />, title: "Easy Pickup", desc: "Multiple locations across the city for your convenience." },
  ];

  return (
    <section className=" mb-5 dark:md:mb-12 bg-[#F4F1DE] dark:bg-[#1E293B] px-4">
      <div className="container md:px-4 mx-auto text-center">
        <h2 className="main-heading mb-12 text-[#3D405B] dark:text-white">Why Choose TravelEase</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((f, i) => (
            <div key={i} className="p-8 rounded-2xl shadow-sm hover:shadow-md transition-all group bg-white dark:bg-[#0F172A] border border-gray-100 dark:border-gray-700">
              <span className="text-4xl text-[#E07A5F] group-hover:scale-110 transition-transform inline-block mb-4">
                {f.icon}
              </span>
              <h4 className="text-xl font-bold mb-2 text-[#3D405B] dark:text-white">{f.title}</h4>
              <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;