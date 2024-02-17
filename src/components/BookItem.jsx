import React, { useState } from "react";
import { useBasket } from "./BasketContext";
import BasketIcon from "../icons/BasketIcon";
import TickIcon from "../icons/TickIcon";
import { getImageFile } from "./FirebaseApp";
import { useEffect } from "react";

export default function BookItem({ bookTitle }) {
  const [quantity, setQuantity] = useState(1);
  const [addedToBasket, setAddedToBasket] = useState(false);
  const { addToBasket } = useBasket();
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(true);

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

  const increaseQuantity = () => {
    if (quantity < 100) {
      setQuantity(quantity + 1);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToBasket = () => {
    setAddedToBasket(true);
    addToBasket({ bookTitle, quantity });

    setTimeout(() => {
      setAddedToBasket(false);
      setQuantity(1);
    }, 3000);
  };

  return (
    <div className="bg-transparent text-black border-2 border-black p-4 rounded-lg text-center hover:shadow-md hover:bg-darkerprimary hover:shadow-black/25 over:bg-white transition-all">
      <div className="text-center">
        <p className="tagline-font h-9 mb-2 items-center font-bold capitalize text-m">
          {bookTitle.replace(/_/g, " ")}
        </p>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <img
            src={image}
            alt={`${bookTitle} cover`}
            className="max-h-24 block justify-center m-auto"
          />
        )}
      </div>
      <div className="flex items-center justify-center mt-4">
        <div className="flex bg-white items-center rounded-full">
          <button
            className={`text-black uppercase text-sm font-semibold rounded-l-full px-3 py-1 hover:font-bold hover:text-red-500 transition-all ${
              addedToBasket ? "text-white" : ""
            }`}
            onClick={decreaseQuantity}
          >
            -
          </button>
          <span className="text-black uppercase text-sm font-semibold px-3 py-1">
            {quantity}
          </span>
          <button
            className={`text-black uppercase text-sm font-semibold rounded-r-full px-3 py-1 hover:font-bold hover:text-green-500 transition-all ${
              addedToBasket ? "text-white" : ""
            }`}
            onClick={increaseQuantity}
          >
            +
          </button>
        </div>
      </div>
      <button
        className={`bg-black mt-4 mb-4 flex gap-2 text-white uppercase text-sm font-semibold rounded-full px-6 py-2 justify-center items-center m-auto tracking-wide hover:font-bold ${
          addedToBasket ? "text-green-500" : ""
        } `}
        style={{ whiteSpace: "nowrap", overflow: "hidden" }}
        onClick={handleAddToBasket}
      >
        {addedToBasket ? (
          <>
            <span>Added</span>
            <TickIcon className={`spin`} />{" "}
          </>
        ) : (
          <>
            <span>Add To Basket</span>
            <BasketIcon />
          </>
        )}
      </button>
    </div>
  );
}
