export default function FAQItem({ question, information }) {
  return (
    <div className="my-4 shadow-md collapse collapse-arrow tagline-font join-item border border-base-300">
      <input type="radio" name="my-accordion-4" />
      <div className="collapse-title text-accent1 font-medium">{question}</div>
      <div className="collapse-content">
        <p>{information}</p>
      </div>
    </div>
  );
}
