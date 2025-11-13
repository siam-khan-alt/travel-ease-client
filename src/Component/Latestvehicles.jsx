import React, {  useEffect, useState } from "react";
import useAxios from "../Hooks/useAxios";
import VehiclesCard from "./VehiclesCard";
import LoadingSpinner from "./LoadingSpinner";

const Latestvehicles = () => {
  
  const [Loading, setLoading] = useState(true);
  const instanceAxios = useAxios();
  const [vehicles, setVehicles] = useState([]);
  useEffect(() => {
    setLoading(true)
    instanceAxios.get("/vehicles/latest").then((data) => {
      setVehicles(data.data);
    })
    .finally(()=>setLoading(false))
  }, [instanceAxios]);
  if (Loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="mx-auto container px-5 dark:mb-5 dark:md:mb-12 md:mb-10">
      <h2 className=" my-5 md:my-10 main-heading ">Latest Vehicles</h2>
      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"  
      >
        {vehicles.map((vehicle) => (
          <VehiclesCard vehicle={vehicle} key={vehicle._id}></VehiclesCard>
        ))}
      </div>
    </div>
  );
};

export default Latestvehicles;
