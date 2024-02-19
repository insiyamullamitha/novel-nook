import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentForm from "./PaymentForm";

const PUBLIC_KEY =
  "pk_test_51OkaFUH4QjMhf4DZyg7mCrP76AR5pb21b2BLuBXvADQvnyHoyd0rbhhvA3Eh3eYMMfaGrbm8T66tYjbLNwCAJtYF00FwvUySnp";
const stripeTestPromise = loadStripe(PUBLIC_KEY);

export default function StripeContainer({ price, basketItems, user }) {
  return (
    <Elements stripe={stripeTestPromise}>
      <PaymentForm price={price} basketItems={basketItems} user={user} />
    </Elements>
  );
}
