/* eslint-disable no-unused-vars */
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import toast from "react-hot-toast";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
const CheckoutForm = ({ closeModal, bookingInfo,refetch }) => {
  const { price } = bookingInfo;
  const { user } = useAuth();
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const axiosSecure = useAxiosSecure();
  useEffect(() => {
    axiosSecure.post("/create-payment-intent", { price }).then((res) => {
      setClientSecret(res?.data?.paymentIntent);
    });
  }, [axiosSecure, price]);
const navigate= useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!stripe || !elements) return;
    const card = elements.getElement(CardElement);
    if (card == null) {
      setLoading(false);
      return;
    }
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setMessage(error.message);
      setLoading(false);
      return;
    }

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: user?.displayName,
            email: user?.email,
          },
        },
      });

    if (confirmError) {
      setMessage(confirmError.message);
      setLoading(false);
    } else if (paymentIntent.status === "succeeded") {
      toast.success("Payment successfull");
      const bookedInfo = {
        ...bookingInfo,
        transectionId: paymentIntent.id,
        bookingDate: new Date(),
        roomId: bookingInfo._id,
        guest: {
          customerName: user?.displayName,
          customerEmail: user?.email,
          customerImage: user?.photoURL,
        },
      };
      console.log("room id", bookingInfo._id);
      console.log("booked id", bookedInfo.roomId);

      await axiosSecure.patch(`/update-status/${bookedInfo?.roomId}`, {
        status: true,
      });
      await axiosSecure.post("/bookings", bookedInfo);
      refetch()
      closeModal();
      navigate("/dashboard/my-bookings")
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />

      <div className="flex justify-between mt-5 border-t py-5 ">
        <button
          disabled={!stripe || !clientSecret || loading}
          type="submit"
          className="px-3 py-2 rounded font-semibold bg-green-100 text-green-60 disabled:cursor-not-allowed "
        >
          Pay ${price}
        </button>
        <button
          onClick={closeModal}
          className="px-3 py-2 rounded font-semibold bg-red-100 text-red-600"
        >
          Cancel
        </button>
      </div>
      {message && <p className="text-center">{message}</p>}
    </form>
  );
};

CheckoutForm.propTypes = {
  bookingInfo: PropTypes.object,
  closeModal: PropTypes.func,
  refetch: PropTypes.func,
};
export default CheckoutForm;
