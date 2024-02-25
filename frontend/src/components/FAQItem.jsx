export default function FAQItem({ question, information }) {
  return (
    <div className="my-4 shadow-md text-center collapse collapse-arrow tagline-font join-item border border-black">
      <input type="radio" name="my-accordion-4" />
      <div className="collapse-title text-accent3 font-bold">{question}</div>
      <div className="collapse-content">
        <p>{information}</p>
      </div>
    </div>
  );
}
