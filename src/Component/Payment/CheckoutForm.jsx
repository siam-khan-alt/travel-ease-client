import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext, useEffect, useState } from "react";
;
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import useAxios from "../../Hooks/useAxios";
import { AuthContext } from "../../Context/AuthContext";

const CheckoutForm = ({ vehicle }) => {
  const stripe = useStripe();
  const elements = useElements();
  const instanceAxios = useAxios();
  const { users } = useContext(AuthContext);
  const [clientSecret, setClientSecret] = useState("");
  const [processing, setProcessing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (vehicle?.pricePerDay > 0) {
      instanceAxios.post("/create-payment-intent", { price: vehicle.pricePerDay })
        .then(res => setClientSecret(res.data.clientSecret));
    }
  }, [vehicle, instanceAxios]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements || processing) return;

    setProcessing(true);
    const card = elements.getElement(CardElement);

    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: { card, billing_details: { email: users?.email, name: users?.displayName } }
    });

    if (error) {
      Swal.fire({ 
        icon: 'error', 
        title: 'Mission Failed', 
        text: error.message,
        background: 'var(--card-bg)', 
        color: 'var(--text-main)',   
        confirmButtonColor: 'var(--primary)',
        iconColor: '#ef4444',
        customClass: {
            popup: 'border border-[var(--primary)]/20 rounded-3xl'
        }
    });
      setProcessing(false);
    } else if (paymentIntent.status === "succeeded") {
      const paymentInfo = {
        transactionId: paymentIntent.id,
        bookingDetails: {
          userEmail: users.email,
          userName: users.displayName,
          vehicleId: vehicle._id,
          vehicleName: vehicle.vehicleName,
          price: vehicle.pricePerDay,
          image: vehicle.coverImage,
        }
      };
      
      const res = await instanceAxios.post("/payments", paymentInfo);
      if (res.data.paymentResult.insertedId) {
        Swal.fire({ 
            icon: 'success', 
            title: 'Payment Confirmed!', 
            html: `<p style="font-size: 12px; opacity: 0.7; color: var(--text-main);">TRX ID: <span style="color: var(--primary);">${paymentIntent.id}</span></p>`,
            background: 'var(--card-bg)', 
            color: 'var(--text-main)',
            confirmButtonText: 'VIEW DEPLOYMENTS',
            confirmButtonColor: 'var(--primary)', 
            iconColor: 'var(--primary)',  
            customClass: {
                popup: 'border border-[var(--primary)]/20 rounded-3xl shadow-2xl',
                confirmButton: 'font-bold tracking-widest uppercase text-xs'
            }
        });
        navigate("/dashboard/my-bookings");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="p-5 bg-[var(--bg-main)] rounded-xl border border-white/10">
        <CardElement options={{ style: { base: { color: '#fff', fontSize: '16px' } } }} />
      </div>
      <button 
        disabled={!stripe || !clientSecret || processing}
        className="btn-gradient w-full py-4 rounded-xl font-bold uppercase tracking-widest text-xs"
      >
        {processing ? "Processing..." : `Pay $${vehicle?.pricePerDay}`}
      </button>
    </form>
  );
};
export default CheckoutForm;