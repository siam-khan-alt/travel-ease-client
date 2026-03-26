import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../Context/AuthContext";
import useAxios from "../../Hooks/useAxios";
import Motions from "../../Component/Motions";
import LoadingSpinner from "../../Component/shared/LoadingSpinner";

import VehicleHero from "../../Component/DetailsPage/VehicleHero";
import InfoCards from "../../Component/DetailsPage/InfoCards";
import ReviewSection from "../../Component/DetailsPage/ReviewSection";
import RelatedVehicles from "../../Component/DetailsPage/RelatedVehicles";
import Breadcrumb from "../../Component/DetailsPage/Breadcrumb";

const Details = () => {
  const { id } = useParams();
  const { users } = useContext(AuthContext);
  const instanceAxios = useAxios();

  const { data: vehicle, isLoading, refetch: refetchVehicle } = useQuery({
    queryKey: ['vehicle', id],
    queryFn: async () => {
      const res = await instanceAxios.get(`/vehicles/${id}`);
      return res.data;
    }
  });

  if (isLoading) return <LoadingSpinner />;

  return (
    <Motions className="bg-[var(--bg-main)] min-h-screen py-10 px-4 md:py-16">
      <div className="container mx-auto ">
        <Breadcrumb category={vehicle.categories} name={vehicle.vehicleName} />
        <VehicleHero vehicle={vehicle} users={users} instanceAxios={instanceAxios} />
        <InfoCards vehicle={vehicle} />
        <ReviewSection 
          vehicleId={id} 
          users={users} 
          instanceAxios={instanceAxios} 
          refetchVehicle={refetchVehicle} 
        />
        <RelatedVehicles 
          category={vehicle?.categories} 
          currentId={id} 
          instanceAxios={instanceAxios} 
        />
      </div>
    </Motions>
  );
};

export default Details;