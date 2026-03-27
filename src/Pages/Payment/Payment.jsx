import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useLocation, useParams } from "react-router-dom";
import CheckoutForm from "../../Component/Payment/CheckoutForm";
import useAxios from "../../Hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../Component/shared/LoadingSpinner";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const Payment = () => {
  const { state } = useLocation();
  const { id } = useParams();
  const instanceAxios = useAxios();

  const { data: booking, isLoading } = useQuery({
    queryKey: ['booking-payment', id],
    enabled: !!id && !state?.vehicle,
    queryFn: async () => {
      const res = await instanceAxios.get(`/booking-details/${id}`);
      return res.data;
    }
  });

  const vehicle = state?.vehicle || booking;

  if (isLoading) return <LoadingSpinner />;
  if (!vehicle) return <div className="text-[var(--text-main)] bg-[var(--bg-main)] text-center  py-20">No booking details found!</div>;

  return (
    <div className="min-h-screen bg-[var(--bg-main)] py-20 px-6 mt-10">
      <div className="max-w-4xl mx-auto bg-[var(--card-bg)] p-10 rounded-2xl border border-white/5 shadow-md grid md:grid-cols-2 gap-10">
        <div className="space-y-4">
          <h2 className="text-3xl font-black text-gradient-gold uppercase">Checkout</h2>
          <img src={vehicle?.coverImage} className="rounded-2xl border border-[var(--primary)]/20" alt="" />
          <h3 className="text-xl font-bold text-white">{vehicle?.vehicleName}</h3>
          <p className="text-2xl font-black text-[var(--primary)]">${vehicle?.price}</p>
        </div>
        
        <div className="flex flex-col justify-center">
          <Elements stripe={stripePromise}>
            <CheckoutForm vehicle={vehicle} />
          </Elements>
        </div>
      </div>
    </div>
  );
};
export default Payment;