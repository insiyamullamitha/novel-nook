import { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { saveOrderToFirestore } from "./FirebaseApp";
import { useBasket } from "./BasketContext";
import { toast } from "react-hot-toast";

const CARD_OPTIONS = {
  iconStyle: "solid",
  style: {
    base: {
      iconColor: "#3498db",
      color: "#2c3e50",
      fontWeight: 500,
      fontSize: "16px",
      fontSmoothing: "antialiased",
      "::placeholder": { color: "#95a5a6" },
    },
    invalid: {
      iconColor: "#e74c3c",
      color: "#e74c3c",
    },
  },
};

export default function PaymentForm({ price, basketItems, user }) {
  const [success, setSuccess] = useState(false);
  const [paymentProcessed, setPaymentProcessed] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const { clearBasket } = useBasket();

  const handlePaymentSuccess = () => {
    toast.success("Payment successful!");
    setTimeout(() => {
      clearBasket();
      setPaymentProcessed(true);
    }, 0);
  };

  const order = {
    user: user.email,
    items: basketItems.map((item) => ({
      title: item.props.bookTitle,
      quantity: item.props.quantity,
    })),
    totalquantity: basketItems.reduce(
      (acc, item) => acc + item.props.quantity,
      0
    ),
    price: price,
    date: new Date().toLocaleDateString(),
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    if (!error) {
      try {
        const { id } = paymentMethod;
        const response = await axios.post("http://localhost:4000/payment", {
          amount: price * 100,
          id,
        });

        if (response.data.success) {
          setSuccess(true);
        }
      } catch (error) {
        console.log("Error", error);
        toast.error("Something went wrong. Please try again.");
      }
    } else {
      console.log(error.message);
      toast.error("Something went wrong. Please try again.");
    }
  };

  if (success && !paymentProcessed) {
    saveOrderToFirestore(user.uid, order);
    handlePaymentSuccess();
  }

  return (
    <div className="tagline-font max-w-md text-black mx-auto">
      {!success ? (
        <form
          onSubmit={handleSubmit}
          className="bg-secondary text-white shadow-md rounded-lg my-4 px-8 -ml-2 pt-6 pb-8"
        >
          <div className="mb-4">
            <label className="block text-black text-m font-bold mb-2">
              Card Details
            </label>
            <div className="w-full tagline-font text-black bg-white rounded-lg">
              <CardElement
                options={CARD_OPTIONS}
                className="text-black p-2 rounded"
              />
            </div>
          </div>
          <button
            className="bg-accent1 hover:bg-success uppercase mx-auto flex text-white py-2 px-5 rounded-full"
            onClick={handleSubmit}
          >
            Pay Now
          </button>
        </form>
      ) : (
        <>
          <Navigate to="/myorders" />
        </>
      )}
    </div>
  );
}
