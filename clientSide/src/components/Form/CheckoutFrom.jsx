import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import "./checkoutForm.css";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
// import toast from "react-hot-toast";

const CheckoutForm = ({ refetch, camp, closePayment }) => {
  const { user } = useAuth();
  const stripe = useStripe();
  const axiosSecure = useAxiosSecure();
  const elements = useElements();
  const [cardError, setCardError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [clientSecret, setClientSecret] = useState("");
  const [paymentData, setpaymentData] = useState({
    campName: camp.campName,
    campFee: camp.campFee,
    participantEmail: camp.participantEmail,
    paymentStatus: true,
    paymentConfirmation: true,
  });

  useEffect(() => {
    const getClientSecret = async () => {
      // server request....
      const { data } = await axiosSecure.post("/create-payment-intent", {
        campId: camp?._id,
      });
      // console.log(data);
      setClientSecret(data?.clientSecret);
    };
    getClientSecret();
  }, [axiosSecure, camp]);

  const handleSubmit = async (event) => {
    setProcessing(true);
    // Block native form submission.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    // Use your card Element with other Stripe.js APIs
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("[error]", error);
      setCardError(error.message);
      setProcessing(false);
      return;
    } else {
      console.log("[PaymentMethod]", paymentMethod);
      setCardError(null);
    }

    // collect the payment from customer
    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card,
        billing_details: {
          name: user?.displayName,
          email: user?.email,
        },
      },
    });

    if (result?.error) {
      setCardError(result?.error?.message);
    }

    if (result?.paymentIntent?.status === "succeeded") {
      // save orderData in db
      paymentData.transactionId = result?.paymentIntent?.id;
      try {
        const { data } = await axiosSecure.post("/add-payment", paymentData);
        console.log(data);
        if (data?.insertedId) {
          toast.success(
            `Order Placed Successfully. Your transactionId is ${result.paymentIntent.id}`,
          );
          console.log(result.paymentIntent.id);
        }
        const { data: patchData } = await axiosSecure.patch(
          `/payment-update/${camp?._id}`,
          { paymentConfirmation: true, paymentStatus: true },
        );
        console.log(patchData);
      } catch (err) {
        console.log(err);
      } finally {
        setProcessing(false);
        setCardError(null);
        refetch();
        closePayment();
      }
    }
    console.log(result);
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />
      {cardError && <p className="text-error mb-6">{cardError}</p>}
      <div className="flex justify-between">
        <button className="btn btn-error" type="button " onClick={closePayment}>
          Cancel
        </button>

        <button
          disabled={!stripe || processing}
          className="btn btn-primary"
          type="submit"
        >
          {processing ? (
            <ClipLoader size={20} className="mt-2" />
          ) : (
            `Pay ${camp?.campFee}$`
          )}
        </button>
      </div>
    </form>
  );
};

export default CheckoutForm;
