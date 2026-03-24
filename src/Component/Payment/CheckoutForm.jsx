import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext, useState } from "react";
;
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import useAxios from "../../Hooks/useAxios";
import { AuthContext } from "../../Context/AuthContext";
import { useMutation, useQuery } from "@tanstack/react-query";

const CheckoutForm = ({ vehicle }) => {
  const stripe = useStripe();
  const elements = useElements();
  const instanceAxios = useAxios();
  const { users } = useContext(AuthContext);
  const [processing, setProcessing] = useState(false);
  const navigate = useNavigate();

  const { data: clientSecretData } = useQuery({
    queryKey: ['payment-intent', vehicle?._id, vehicle?.price],
    enabled: !!vehicle?.price && vehicle.price > 0,
    queryFn: async () => {
      const res = await instanceAxios.post("/create-payment-intent", { price: vehicle.price });
      return res.data.clientSecret;
    },
    staleTime: Infinity, 
  });

  const clientSecret = clientSecretData;

  const paymentMutation = useMutation({
    mutationFn: async (paymentInfo) => {
      const res = await instanceAxios.post("/payments", paymentInfo);
      return res.data;
    },
    onSuccess: (data) => {
      if (data.paymentResult?.insertedId) {
        Swal.fire({ 
          icon: 'success', 
          title: 'Payment Confirmed!', 
          html: `<p style="font-size: 12px; opacity: 0.7; color: var(--text-main);">Transaction Successful. Terminal clear.</p>`,
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
    },
    onError: (error) => {
      Swal.fire({
        icon: 'error',
        title: 'Deployment Failed',
        text: error.message,
        background: 'var(--card-bg)',
        color: 'var(--text-main)'
      });
      setProcessing(false);
    }
  });

  const handleSubmit = async (e) => {
    console.log("Secret:", clientSecret)
    e.preventDefault();
    if (!stripe || !elements || processing || !clientSecret) return;

    setProcessing(true);
    const card = elements.getElement(CardElement);

    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: { 
        card, 
        billing_details: { email: users?.email, name: users?.displayName } 
      }
    });

    if (error) {
      Swal.fire({ 
        icon: 'error', 
        title: 'Mission Failed', 
        text: error.message,
        background: 'var(--card-bg)', 
        color: 'var(--text-main)',
        confirmButtonColor: 'var(--primary)',
      });
      setProcessing(false);
    } else if (paymentIntent.status === "succeeded") {
      const paymentInfo = {
        transactionId: paymentIntent.id,
        bookingDetails: {
          userEmail: users.email,
          userName: users.displayName,
          vehicleId: vehicle.vehicleId,
          vehicleName: vehicle.vehicleName,
          price: vehicle.price,
          image: vehicle.coverImage,
          hostEmail: vehicle.hostEmail
        }
      };
      paymentMutation.mutate(paymentInfo);
    }
  };
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="p-5 bg-[var(--bg-main)] rounded-xl border border-white/10">
        <CardElement options={{ style: { base: { color: '#fff', fontSize: '16px',
              fontFamily: 'Outfit, sans-serif',
              '::placeholder': { color: '#94a3b8' } } } }} />
      </div>
      <button 
        disabled={!stripe || !clientSecret || processing}
        className="btn-gradient w-full py-4 rounded-xl font-bold uppercase tracking-widest text-xs"
      >
        {processing ? "Processing..." : `Pay $${vehicle?.price}`}
      </button>
    </form>
  );
};
export default CheckoutForm;