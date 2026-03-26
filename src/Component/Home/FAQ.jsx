import React from "react";

const FAQ = () => {
  const faqData = [
    {
      q: "How can I book a car?",
      a: "As a User, simply browse our fleet, choose your dates, and secure your terminal booking. Your active bookings will appear in your 'My Bookings' dashboard.",
    },
    {
      q: "How do I become a Host and add vehicles?",
      a: "Register as a Host, go to your 'Add New Vehicle' dashboard, and submit your car details. Our Admin team will verify it before it goes live on the fleet.",
    },
    {
      q: "Can I get the car delivered to a different location?",
      a: "Yes, many of our Hosts offer custom delivery locations. You can check the availability during the booking process or contact the Host directly.",
    },
    {
      q: "What documents do I need to rent a car?",
      a: "You need a valid driving license, a national ID or Passport, and a payment method. Admins ensure all users are verified for a safe elite experience.",
    },
    {
      q: "How does the payment and revenue system work?",
      a: "Users pay securely through our terminal. Hosts can track their income in 'Host Analytics', while Admins monitor platform revenue and commissions.",
    },
  ];

  return (
    <section className="py-12 md:py-16 lg:py-20 bg-[var(--bg-main)]">
      <div className="container mx-auto px-6">
        {/* Section Heading */}
        <div className="mb-16">
          <p className="text-[10px] uppercase tracking-[0.5em] text-[var(--primary)] font-bold mb-3 text-center">
            Support Terminal
          </p>
          <h2 className="text-4xl md:text-5xl main-heading">Frequently Asked Questions</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side Accordion Section */}
          <div className="space-y-4">
            {faqData.map((item, index) => (
              <div
                key={index}
                className="collapse collapse-arrow bg-[var(--card-bg)] border border-[var(--primary)]/10 rounded-xl overflow-hidden shadow-sm hover:border-[var(--primary)]/30 transition-all duration-500"
              >
                <input
                  type="radio"
                  name="faq-accordion"
                  defaultChecked={index === 0}
                />

                <div className="collapse-title text-sm md:text-base text-[var(--primary)] font-bold  py-5">
                  {item.q}
                </div>

                <div className="collapse-content">
                  <div className="pt-2 pb-4 text-sm md:text-base text-[var(--text-main)] opacity-70 leading-relaxed border-t border-[var(--primary)]/5">
                    {item.a}
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* Right side img in lg */}
          <div className="relative group hidden lg:block h-full">
            <div className="relative h-full min-h-[500px] rounded-2xl overflow-hidden shadow-sm dark:shadow-md transition-all duration-700 border border-gray-100 dark:border-white/5">
              <img
                src="https://i.ibb.co.com/6774TNG0/image.png"
                alt="Elite Car"
                className="w-full h-full object-cover brightness-100 dark:brightness-[0.55] group-hover:scale-105 transition-all duration-[2s] ease-[cubic-bezier(0.22,1,0.36,1)]"
              />

              <div className="hidden dark:block absolute inset-0 bg-[#1E293B]/40 mix-blend-multiply z-10"></div>

              <div className="hidden dark:block absolute inset-0 bg-gradient-to-t from-[#1E293B]/20 via-[#1E293B]/20 to-[#1E293B]/10 z-10"></div>

              <div className="absolute bottom-10 left-10 z-20 flex flex-col gap-2">
                <p className="text-[var(--primary)] text-5xl font-extrabold tracking-tighter uppercase leading-none text-gradient-gold opacity-40 dark:opacity-50 group-hover:opacity-100 transition-opacity duration-1000">
                  TRAVEL EASE
                </p>
                <div className="w-16 h-[2px] bg-[var(--primary)] group-hover:w-full transition-all duration-1000 delay-300 shadow-[0_0_10px_rgba(197,160,89,0.5)]"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
