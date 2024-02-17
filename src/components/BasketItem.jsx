import { useBasket } from "./BasketContext";
import { useState, useEffect } from "react";
import { getImageFile } from "./FirebaseApp";

export default function BasketItem({ bookTitle, quantity }) {
  const { deleteItem, updateQuantity } = useBasket();
  const [selectedQuantity, setSelectedQuantity] = useState(quantity);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false); // Add missing loading state variable

  const handleQuantityUpdate = () => {
    updateQuantity(bookTitle, selectedQuantity);
  };

  const handleDelete = () => {
    deleteItem(bookTitle);
    setSelectedQuantity(1);
  };

  useEffect(() => {
    setLoading(true);
    getImageFile(bookTitle)
      .then((url) => {
        setImage(url);
        setLoading(false);
      })
      .catch((error) => {
        console.error(`Error fetching image for ${bookTitle}`, error);
        setImage(null);
        setLoading(false);
      });
  }, [bookTitle]);

  return (
    <div className="my-6 bg-white shadow-xl rounded-lg p-4 flex tagline-font items-center justify-between">
      <div className="flex items-center gap-8">
        <img className="max-h-24 block" src={image} />
        <div>
          <h3 className="text-m min-w-13 max-w-13 w-13 text-black capitalize overflow-hidden">
            {bookTitle.replace(/_/g, " ")}
          </h3>
          <p className="text-gray-500">Price: £8.99</p>
        </div>
      </div>
      <div className="flex flex-col items-center">
        {" "}
        <p className="text-gray-500">Quantity: </p>
        <form>
          <select
            className="bg-white border-2 border-gray-300 text-black font-semibold"
            defaultValue={quantity}
            onChange={(e) => setSelectedQuantity(parseInt(e.target.value, 10))}
          >
            {[...Array(100).keys()].map((option) => (
              <option key={option + 1} value={option + 1}>
                {option + 1}
              </option>
            ))}
          </select>
        </form>
        <button
          onClick={handleQuantityUpdate}
          className="text-blue-500 font-semibold mt-2"
        >
          Update
        </button>
        <button
          onClick={handleDelete}
          className="text-red-500 font-semibold mt-2"
        >
          Remove
        </button>
      </div>
    </div>
  );
}
