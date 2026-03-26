import React from "react";
import { 
  FaUsers, FaCar, FaHandshake, FaGem, FaClock, FaQuestionCircle, 
  FaStar,
  FaBell
} from "react-icons/fa";
import Motions from "../../Component/Motions";
import useAxios from "../../Hooks/useAxios";
import { useQuery } from "@tanstack/react-query";

const AboutUs = () => {
  const axiosPublic = useAxios();

  const { data: statsData, isLoading } = useQuery({
    queryKey: ['site-statistics'],
    queryFn: async () => {
      const res = await axiosPublic.get('/site-stats');
      return res.data;
    }
  });

  if (isLoading) return <LoadingSpinner />;
 const stats = [
    {icon: <FaCar />, label: "Vehicles Available", value: `${statsData?.totalVehicles || 0}+` },
    { icon: <FaUsers />, label: "Happy Customers", value: `${statsData?.totalHappyCustomers || 0}+` },
    {icon: <FaBell />, label: "Subscription", value: statsData?.totalSubscriptions || 0 },
    {icon: <FaStar />, label: "User Reviews", value: `${statsData?.avgRating || "0.0"}/5` },
  ];

 

  const values = [
    {
      title: "Excellence",
      desc: "We maintain a gold standard in every vehicle we verify and every booking we process.",
      icon: <FaGem />
    },
    {
      title: "Integrity",
      desc: "Transparent payment history and honest host-user relations are the pillars of our community.",
      icon: <FaHandshake />
    },
    {
      title: "Reliability",
      desc: "With 24/7 monitoring and instant booking requests, we are always there when you need us.",
      icon: <FaClock />
    }
  ];

  return (
    <div className="bg-[var(--bg-main)] "><div className="bg-[var(--bg-main)] container mx-auto px-6">
      {/* 1. Hero Section */}
      <section className="relative py-12 md:py-16  ">
        <Motions className="container mx-auto  text-center relative z-10">
          <p className="text-[10px] uppercase tracking-[0.6em] text-[var(--primary)] font-bold mb-4">
            Since 2010 | Premium Mobility
          </p>
          <h1 className="main-heading text-4xl md:text-5xl mb-8 leading-tight">Driving the Future of <br className="lg:hidden flex" /> Luxury<br className="lg:flex hidden" /> Car Rentals</h1>
          <p className="max-w-4xl mx-auto text-sm md:text-base opacity-70 leading-relaxed font-light">
            Travel Ease is a sophisticated ecosystem designed for those who value time, comfort, and class. 
            From Gafargaon to the entire nation, we bring the world's finest wheels to your doorstep, 
            ensuring every journey is defined by elegance and safety.
          </p>
        </Motions>
      </section>

      {/* 2. Stats Section - Using card-bg for contrast */}
      <section className="py-12 md:py-16 lg:py-20 border-y border-[var(--primary)]/10 bg-[var(--card-bg)] rounded-2xl shadow-sm">
        <div className="w-full">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-10">
            {stats.map((stat, idx) => (
              <Motions key={idx} className="text-center group">
                <div className="text-3xl text-[var(--primary)] mb-4 flex justify-center group-hover:scale-110 transition-transform duration-500">
                  {stat.icon}
                </div>
                <h2 className="text-3xl font-black text-gradient-gold mb-1">{stat.value}</h2>
                <p className="text-[10px] uppercase tracking-widest opacity-50 font-bold">{stat.label}</p>
              </Motions>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Our Philosophy */}
      <section className="py-12 md:py-16  ">
        <div className="container mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-4xl text-gradient-gold">Our Core Philosophy</h2>
            <div className="w-16 h-[2px] bg-[var(--primary)] mx-auto mt-4"></div>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((v, i) => (
              <Motions key={i} className="p-10 rounded-2xl bg-[var(--card-bg)] border border-black/5 hover:border-[var(--primary)]/30 transition-all duration-500 shadow-sm">
                <div className="w-14 h-14 rounded-xl bg-[var(--primary)]/10 flex items-center justify-center text-2xl text-[var(--primary)] mb-6">
                  {v.icon}
                </div>
                <h4 className="text-xl font-bold mb-4 tracking-tight uppercase">{v.title}</h4>
                <p className="text-xs opacity-60 leading-relaxed font-medium">{v.desc}</p>
              </Motions>
            ))}
          </div>
        </div>
      </section>

      {/* 4. The Ecosystem (Role Based Info) */}
      <section className="py-12 md:py-16 ">
        <div className="container mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-4xl text-gradient-gold">A Platform Built for <br className="lg:hidden flex" /> Every<br className="lg:flex hidden" /> Stakeholder</h2>
            <div className="w-16 h-[2px] bg-[var(--primary)] mx-auto mt-4"></div>
          </div>
          <div className="flex flex-col lg:flex-row items-center gap-20">
            <Motions className="w-full lg:w-1/2">
              <div className="space-y-6">
                
                <div className="space-y-8 mt-10">
                  {[
                    { num: "01", role: "For Travelers", text: "Access a curated wishlist, track every transaction ID, and manage current or past bookings with our intuitive user dashboard." },
                    { num: "02", role: "For Hosts", text: "Turn your asset into income. Use Recharts-powered analytics to track revenue and manage vehicle requests in real-time." },
                    { num: "03", role: "For Admins", text: "Complete control over platform integrity—from verifying new vehicles to managing user roles and generating revenue reports." }
                  ].map((item, idx) => (
                    <div key={idx} className="flex gap-6 p-6 rounded-2xl bg-[var(--card-bg)] border border-black/5 shadow-sm">
                      <div className="shrink-0 w-12 h-12 rounded-xl border border-[var(--primary)]/30 flex items-center justify-center font-bold text-[var(--primary)]">{item.num}</div>
                      <div>
                        <h5 className="font-bold text-lg mb-2 uppercase tracking-tight text-[var(--primary)]">{item.role}</h5>
                        <p className="text-xs opacity-60 leading-relaxed font-medium">{item.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Motions>
            <Motions className="w-full lg:w-1/2 relative">
               <div className="rounded-2xl overflow-hidden shadow-md border border-black/5">
                  <img 
                    src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80&w=800" 
                    alt="Dashboard Preview" 
                    className="w-full h-full object-cover"
                  />
               </div>
               <div className="absolute -bottom-6 -left-6 bg-[var(--primary)] px-8 py-6 rounded-2xl hidden md:block shadow-md">
                  <p className="text-[#0A0F14] font-black text-3xl tracking-tighter uppercase">Secure & <br /> Fast</p>
               </div>
            </Motions>
          </div>
        </div>
      </section>

      {/* 5. FAQ Preview */}
      <section className="py-12 md:py-16  text-center">
         <FaQuestionCircle className="text-5xl text-[var(--primary)]/20 mx-auto mb-6" />
         <h2 className="text-3xl  mb-12 text-gradient-gold">Common Inquiries</h2>
         <div className="grid md:grid-cols-2 gap-6 text-left max-w-4xl mx-auto">
            <div className="p-8 bg-[var(--card-bg)] rounded-2xl border border-black/5 shadow-sm hover:border-[var(--primary)]/20 transition-all">
                <h6 className="font-bold text-sm mb-3 text-[var(--primary)] uppercase">How do I become a host?</h6>
                <p className="text-xs opacity-60 leading-relaxed font-medium">Register your account, navigate to 'Add Vehicle' in your dashboard, and once our admin verifies your credentials, your car will be live.</p>
            </div>
            <div className="p-8 bg-[var(--card-bg)] rounded-2xl border border-black/5 shadow-sm hover:border-[var(--primary)]/20 transition-all">
                <h6 className="font-bold text-sm mb-3 text-[var(--primary)] uppercase">Is my payment secure?</h6>
                <p className="text-xs opacity-60 leading-relaxed font-medium">Yes. Every transaction is processed through secure channels with unique IDs, accessible anytime via your payment history.</p>
            </div>
         </div>
      </section>

      {/* 6. CTA Section */}
      <section className="py-12 md:py-16 bg-[var(--bg-main)]">
  <div className="container mx-auto">
    <Motions className="relative overflow-hidden bg-[var(--card-bg)] border border-[var(--primary)]/20 rounded-2xl p-8 md:p-16 shadow-sm transition-all duration-700">
      
      {/* Decorative Elements - matching Newsletter style */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--primary)]/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-[var(--primary)]/5 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl pointer-events-none"></div>

      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
        
        {/* Left Side: Content */}
        <div className="max-w-2xl text-center lg:text-left">
          <div className="flex items-center justify-center lg:justify-start gap-3 mb-6 text-[var(--primary)]">
            <span className="w-10 h-[1px] bg-[var(--primary)]/40 hidden md:block"></span>
            <span className="text-[10px] uppercase tracking-[0.4em] font-bold">Premium Experience</span>
          </div>
          
          <h2 className="text-3xl md:text-5xl font-black mb-6 text-gradient-gold font-outfit leading-tight uppercase">
            Drive Your Dreams <br className="hidden md:block" /> Into Reality Today
          </h2>
          
          <p className="text-[var(--text-main)] opacity-70 text-sm md:text-base leading-relaxed font-poppins max-w-lg">
            Whether you are seeking a luxury sedan for high-end business meetings or a rugged SUV for a weekend adventure, 
            Travel Ease provides the gold standard in premium mobility.
          </p>
        </div>

        {/* Right Side: Action Buttons */}
        <div className="w-full lg:w-auto flex flex-col sm:flex-row items-center gap-5">
          <button className="btn-gradient w-full sm:w-auto min-w-[200px] !py-4">
            Explore the Fleet
          </button>
          
          <button className="px-8 py-5 rounded-xl font-bold uppercase tracking-[0.1em] text-[10px] border border-[var(--primary)]/30 text-[var(--text-main)] hover:bg-[var(--primary)]/5 transition-all duration-500 font-poppins cursor-pointer w-full sm:w-auto">
            Contact Sales
          </button>
        </div>

      </div>
    </Motions>
  </div>
</section>
      </div>
    </div>
  );
};

export default AboutUs;