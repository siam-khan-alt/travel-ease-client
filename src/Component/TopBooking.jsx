import React, { useEffect, useState } from "react";
import LoadingSpinner from "./LoadingSpinner";
import VehicleCard from "./VehiclesCard";
import useAxios from "../Hooks/useAxios";


const TopBooking = () => {
  const [vehicles, setVehicles] = useState([]);
  const instanceAxios = useAxios()
   const [Loading, setLoading] = useState(true);
  

  useEffect(() => {
    setLoading(true)
     instanceAxios.get("/vehicles/top") 
      .then((res) => {
        setVehicles(res.data);
        
      })
      .finally(() => {
        setLoading(false);
      });
  }, [instanceAxios, setLoading]);

  if (Loading) return <LoadingSpinner></LoadingSpinner>

  return (
   <div className="container mx-auto dark:mb-5 dark:md:mb-12 md:mb-10 px-4">
     <h2 className="main-heading my-5 md:my-10">
        Top Booking
     </h2>
     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
      {vehicles.map((vehicle) => <VehicleCard key={vehicle._id} vehicle={vehicle}></VehicleCard>
      )}
    </div>
   </div>
  );
};

export default TopBooking;
