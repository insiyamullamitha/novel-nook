import Navbar from "../components/Navbar";
import TagLineStrip from "../components/TagLineStrip";
import { useBasket, calculateBasketCount } from "../components/BasketContext";
import { useState, useEffect } from "react";
import BasketItem from "../components/BasketItem";

export default function Basket() {
  const { state } = useBasket();
  const emptyBasket = state.items.length === 0;
  const [basketItems, setBasketItems] = useState([]);
  const [price, setPrice] = useState("£0.00");
  const basketCount = calculateBasketCount(state.items);

  useEffect(() => {
    if (!emptyBasket) {
      // Use map to create an array of BasketItem components
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
  }, [state.items, emptyBasket]);

  return (
    <>
      <div className="py-4 bg-secondary shadow-xl">
        <div className="my-4">
          <Navbar />
        </div>
      </div>
      <TagLineStrip className="shadow-xl" />
      <div className="container mx-auto px-8 mt-8 grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-12">
        <div>
          <h1 className="text-4xl font-bold text-accent1">Basket</h1>
          {emptyBasket ? (
            <p>There are no items in your basket.</p>
          ) : (
            <div>{basketItems}</div>
          )}
        </div>
        <div>
          <h1 className="text-4xl text-accent1 font-bold">Total</h1>
          <p className="text-2xl mt-4">{price}</p>
        </div>
      </div>
    </>
  );
}
