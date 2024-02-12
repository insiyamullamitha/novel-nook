export default function BasketItem({ bookTitle, quantity }) {
  return (
    <div className="my-4 bg-white shadow-xl rounded-lg p-4">
      <div className="flex justify-between">
        <h3 className="text-xl text-black font-semibold">{bookTitle}</h3>
        <button className="text-red-500 font-semibold">Remove</button>
      </div>
      <div className="flex justify-between my-4">
        <p className="text-gray-500">Price</p>
        <p className="text-gray-500">£8.99</p>
      </div>
      <div className="flex justify-between">
        <p className="text-gray-500">Quantity: </p>
        <p className="text-gray-500">{quantity}</p>
      </div>
    </div>
  );
}
