import Navbar from "../components/Navbar";
import TagLineStrip from "../components/TagLineStrip";
import { useBasket, calculateBasketCount } from "../components/BasketContext";
import { useState, useEffect } from "react";
import BasketItem from "../components/BasketItem";
import Footer from "../components/Footer";

export default function Basket() {
  const { state } = useBasket();
  const emptyBasket = state.items.length === 0;
  const [basketItems, setBasketItems] = useState([]);
  const [price, setPrice] = useState("£0.00");
  const basketCount = calculateBasketCount(state.items);

  useEffect(() => {
    if (!emptyBasket) {
      const itemsArray = state.items.map((item, index) => (
        <BasketItem
          key={index}
          bookTitle={item.bookTitle}
          quantity={item.quantity}
        />
      ));

      setBasketItems(itemsArray);
    }
    setPrice(`£${(basketCount * 8.99).toFixed(2)}`);
  }, [state.items, emptyBasket, basketCount]);

  return (
    <>
      <div className="py-4 bg-secondary shadow-xl">
        <div className="my-4">
          <Navbar />
        </div>
      </div>
      <TagLineStrip className="shadow-xl" />
      <div className="tagline-font container mx-auto text-black px-8 mt-8 grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 min-h-screen gap-8">
        <div>
          <h1 className="text-4xl tagline-font font-bold text-accent1">
            Basket
          </h1>
          {emptyBasket ? (
            <p className="text-xl mt-4">There are no items in your basket.</p>
          ) : (
            <div>{basketItems}</div>
          )}
        </div>
        <div>
          <h1 className="text-4xl tagline-font text-accent1 font-bold">
            Total
          </h1>
          <p className="text-xl tagline-font mt-4">{price}</p>
        </div>
      </div>
      <Footer className="mt-auto" />
    </>
  );
}
