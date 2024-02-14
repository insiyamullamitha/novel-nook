import FAQItem from "./FAQItem";

export default function FAQs() {
  return (
    <>
      <h1 className="text-4xl tagline-font mb-8 text-secondary font-bold text-center">
        FAQs
      </h1>
      <div className="join flex mb-12 join-vertical text-black justify-center container mx-auto px-8">
        <FAQItem
          question={"Can I change or amend an order?"}
          information={
            "Once an order has been placed, we cannot make changes to the billing address, payment method, delivery address or delivery method. If you would like to amend these aspects of your order, we recommend cancelling that order in order to place it again after making the required changes."
          }
        />
        <FAQItem
          question={
            "Do you accept gift cards or other vouchers like the National Book Token?"
          }
          information={
            "Currently we can only accept orders paid with credit or debit cards. We're working on this!"
          }
        />
        <FAQItem
          question={"How long will my order take to deliver?"}
          information={
            "It usually takes about 3-5 days from dispatch. Please wait 10 working days before contacting us if you haven't received your items as there can be delays from the post office."
          }
        />
        <FAQItem
          question={"How can I return an item?"}
          information={
            "Unfortunately we cannot accept returns on books. If you have any other issues, please contact us."
          }
        />
      </div>
    </>
  );
}
