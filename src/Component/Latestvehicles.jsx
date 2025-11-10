import React, { useEffect, useState } from "react";
import useAxios from "../Hooks/useAxios";
import VehiclesCard from "./VehiclesCard";

const Latestvehicles = () => {
  const instanceAxios = useAxios();
  const [vehicles, setVehicles] = useState([]);
  useEffect(() => {
    instanceAxios.get("/vehicles/latest").then((data) => {
      setVehicles(data.data);
    });
  }, [instanceAxios]);
  console.log(vehicles);

  return (
    <div className="mx-auto container mb-5">
      <h2 className=" my-4 main-heading mb-6">
        Latest Vehicles
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {vehicles.map((vehicle) => (
          <VehiclesCard vehicle={vehicle} key={vehicle._id}></VehiclesCard>
        ))}
      </div>
    </div>
  );
};

export default Latestvehicles;
