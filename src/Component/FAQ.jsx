const FAQ = () => {
  return (
    <section className=" dark:mb-5 dark:md:mb-12 bg-[#F4F1DE] dark:bg-[#1E293B] px-5">
      <div className="max-w-3xl mx-auto">
        <h2 className="main-heading mb-10 text-center text-[#3D405B] dark:text-white">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {[
            { q: "How do I book a car?", a: "Simply browse our fleet, select your dates, and click the 'View Details' button to proceed with the booking." },
            { q: "What documents are required?", a: "You need a valid driving license, an ID proof (Passport/NID), and a credit card for the security deposit." },
            { q: "Is insurance included?", a: "Yes, all our rentals include basic insurance. Additional premium coverage can be selected during pickup." }
          ].map((item, index) => (
            <div key={index} className="collapse collapse-plus bg-white dark:bg-[#0F172A] border border-gray-200 dark:border-gray-700">
              <input type="radio" name="faq-accordion" defaultChecked={index === 0} />
              <div className="collapse-title text-lg font-bold text-[#3D405B] dark:text-[#F2CC8F]">
                {item.q}
              </div>
              <div className="collapse-content text-gray-700 dark:text-gray-300">
                <p>{item.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;