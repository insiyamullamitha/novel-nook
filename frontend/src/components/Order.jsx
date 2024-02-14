export default function Order({ date, price, items }) {
  return (
    <div className="container my-4 mx-auto max-w-full-lg bg-white p-8 rounded-lg shadow-xl">
      <div>
        <h1 className="text-xl tagline-font font-bold text-accent1">{date}</h1>
        <p className="text-m mt-4">Total Price: {price}</p>
        <p className="text-m mt-4">Items: {items}</p>
      </div>
    </div>
  );
}
