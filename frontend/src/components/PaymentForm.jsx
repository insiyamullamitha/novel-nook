import { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import { Navigate } from "react-router-dom";

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

export default function PaymentForm({ price }) {
  const [success, setSuccess] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

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
          console.log("Successful payment");
          setSuccess(true);
        }
      } catch (error) {
        console.log("Error", error);
      }
    } else {
      console.log(error.message);
    }
  };

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
          <button className="bg-accent1 uppercase mx-auto flex text-white py-2 px-5 rounded-full">
            Pay Now
          </button>
        </form>
      ) : (
        <Navigate to="/myorders" />
      )}
    </div>
  );
}
