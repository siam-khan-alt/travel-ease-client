import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import Motions from "../../Component/Motions";

const RelatedVehicles = ({ category, currentId, instanceAxios }) => {
  const { data: relatedVehicles = [] } = useQuery({
    queryKey: ['related-vehicles', category, currentId],
    enabled: !!category,
    queryFn: async () => {
      const res = await instanceAxios.get(`/related-vehicles?category=${category}&currentId=${currentId}`);
      return res.data;
    }
  });

  if (relatedVehicles.length === 0) return null;

  return (
    <div className="mt-32">
      <div className="flex items-center gap-6 mb-12">
        <h3 className="text-2xl font-black text-gradient-gold uppercase whitespace-nowrap">Similar Collections</h3>
        <div className="h-[1px] w-full bg-[var(--primary)]/10"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {relatedVehicles.map((item, index) => (
          <Motions key={item._id} delay={index * 0.1}>
            <Link 
              to={`/details/${item._id}`} 
              onClick={() => window.scrollTo(0, 0)} 
              className="group bg-[var(--card-bg)] border border-[var(--primary)]/5 rounded-2xl overflow-hidden flex flex-col md:flex-row shadow-lg hover:border-[var(--primary)]/30 transition-all duration-500 h-full"
            >
              <div className="md:w-[40%] overflow-hidden">
                <img 
                  src={item.coverImage} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" 
                  alt={item.vehicleName}
                />
              </div>
              <div className="p-8 flex flex-col justify-center flex-1">
                <span className="text-[8px] font-black text-[var(--primary)] uppercase tracking-[0.3em] mb-2">
                  {item.categories}
                </span>
                <h4 className="text-xl font-black text-[var(--text-main)] uppercase mb-2">
                  {item.vehicleName}
                </h4>
                <p className="text-[var(--primary)] font-black text-lg mb-6">
                  ${item.pricePerDay} <span className="text-[10px] opacity-40">/ DAY</span>
                </p>
                <span className="text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2 group-hover:gap-4 transition-all">
                  Explore Asset <FaArrowRight />
                </span>
              </div>
            </Link>
          </Motions>
        ))}
      </div>
    </div>
  );
};

export default RelatedVehicles;