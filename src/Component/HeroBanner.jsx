import { Link } from "react-router-dom";

const HeroBanner = () => {
  return (
    <div
      className="relative mt-0 md:mt-5 container mx-auto md:min-h-[70vh] min-h-[60vh] flex items-center justify-center text-center text-white"
    >
      <div className="absolute inset-0">
        <img
          src="https://i.ibb.co.com/Mx1JPG9M/ev-running-costs.jpg"
          alt=""
          className="w-full h-full brightness-100 dark:brightness-50 object-cover"
        />
        <div className="absolute inset-0 bg-black/50"></div>
      </div>
      <div className="relative z-10 px-4">
        <h1 className="text-5xl md:text-6xl font-bold mb-4">
          Find Your Perfect Ride!
        </h1>
        <p className="text-lg md:text-xl mb-8 text-gray-200 max-w-2xl mx-auto">
          Explore a variety of vehicles and book your next trip with ease and comfort.
        </p>

        <div className="flex justify-center">
          <Link
            to="/allVehicles"
            className="btn-gradient max-w-[300px]"
          >
            View All Vehicles
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
