import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useLocation } from "react-router-dom";
import CheckoutForm from "../../Component/Payment/CheckoutForm";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const Payment = () => {
  const { state } = useLocation();
  const vehicle = state?.vehicle;

  return (
    <div className="min-h-screen bg-[var(--bg-main)] py-20 px-6 mt-10">
      <div className="max-w-4xl mx-auto bg-[var(--card-bg)] p-10 rounded-3xl border border-white/5 shadow-2xl grid md:grid-cols-2 gap-10">
        <div className="space-y-4">
          <h2 className="text-3xl font-black text-gradient-gold uppercase">Checkout</h2>
          <img src={vehicle?.coverImage} className="rounded-2xl border border-[var(--primary)]/20" alt="" />
          <h3 className="text-xl font-bold text-white">{vehicle?.vehicleName}</h3>
          <p className="text-2xl font-black text-[var(--primary)]">${vehicle?.pricePerDay}</p>
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