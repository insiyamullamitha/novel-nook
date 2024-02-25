import { useState, useRef } from "react";
import { useBasket } from "./BasketContext";
import BasketIcon from "../icons/BasketIcon";
import TickIcon from "../icons/TickIcon";
import InfoIcon from "../icons/InfoIcon";
import { getImageFile } from "./FirebaseApp";
import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function BookItem({ book }) {
  const [quantity, setQuantity] = useState(1);
  const [addedToBasket, setAddedToBasket] = useState(false);
  const { addToBasket } = useBasket();
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const bookTitle = book.Title;

  const imageRef = useRef(null);

  useEffect(() => {
    setLoading(true);

    if (imageRef.current) {
      setImage(imageRef.current);
      setLoading(false);
      return;
    }

    getImageFile(bookTitle)
      .then((url) => {
        setImage(url);
        imageRef.current = url;
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
    <div className="bg-transparent text-black border-2 border-black p-4 rounded-lg text-center hover:shadow-md hover:shadow-black/25 over:bg-white transition-all">
      <div className="text-center">
        <div className="flex flex-row mt-1 h-9 items-center justify-center">
          <p className="tagline-font mb-0 items-center font-bold capitalize text-m">
            {bookTitle.replace(/_/g, " ")}
          </p>
          <Link to={`/books/${bookTitle}`}>
            <button
              className={`text-4xl flex gap-2 text-black uppercase text-sm font-semibold rounded-full px-2 py-2 mt-0.5 justify-center items-center m-auto tracking-wide hover:font-bold `}
              style={{ whiteSpace: "nowrap", overflow: "hidden" }}
            >
              <InfoIcon />
            </button>
          </Link>
        </div>
        <p className="tagline-font mb-1 text-accent1 items-center font-bold capitalize text-xs">
          {book.Author}
        </p>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <img
            src={image}
            alt={`${bookTitle} cover`}
            className="max-w-24 block justify-center m-auto"
          />
        )}
      </div>
      <div className="flex items-center justify-center gap-4 mt-4">
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
