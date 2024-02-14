import { useBasket } from "./BasketContext";
import { useState } from "react";

export default function BasketItem({ bookTitle, quantity }) {
  const { deleteItem, updateQuantity } = useBasket();
  const [selectedQuantity, setSelectedQuantity] = useState(quantity);

  const handleQuantityUpdate = () => {
    updateQuantity(bookTitle, selectedQuantity);
  };

  const handleDelete = () => {
    deleteItem(bookTitle);
    setSelectedQuantity(1);
  };

  return (
    <div className="my-4 bg-white shadow-xl rounded-lg p-4 flex tagline-font items-center justify-between">
      <div className="flex items-center gap-8">
        <img
          className="max-h-24 block"
          src={`/${bookTitle}.png`}
          alt={`${bookTitle} cover`}
        />
        <div>
          <h3 className="text-m text-black capitalize">
            {bookTitle.replace(/_/g, " ")}
          </h3>
          <p className="text-gray-500">Price: £8.99</p>
        </div>
      </div>
      <div>
        <p className="text-gray-500">Quantity: </p>
        <form>
          <select
            className="bg-white border-2 border-gray-300 text-black font-semibold"
            defaultValue={quantity}
            onChange={(e) => setSelectedQuantity(parseInt(e.target.value, 10))}
            readOnly
          >
            {[...Array(100).keys()].map((option) => (
              <option key={option + 1} value={option + 1}>
                {option + 1}
              </option>
            ))}
          </select>
        </form>
      </div>
      <button
        onClick={handleQuantityUpdate}
        className="text-blue-500 font-semibold"
      >
        Update
      </button>
      <button onClick={handleDelete} className="text-red-500 font-semibold">
        Remove
      </button>
    </div>
  );
}
