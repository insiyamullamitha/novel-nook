import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import TagLineStrip from "../components/TagLineStrip";
import BasketItem from "../components/BasketItem";
import Footer from "../components/Footer";
import Right from "../icons/Right";
import { useBasket, calculateBasketCount } from "../components/BasketContext";

export default function Basket() {
  const { state } = useBasket();
  const emptyBasket = state.items.length === 0;
  const [basketItems, setBasketItems] = useState([]);
  const [price, setPrice] = useState(
    `£${(calculateBasketCount(state.items) * 8.99).toFixed(2)}`
  );
  const [shippingPrice, setShippingPrice] = useState(3.99);
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
    setShippingPrice(basketCount * 8.99 > 25 ? 0 : 3.99);
  }, [state.items, emptyBasket, basketCount]);

  return (
    <>
      <div className="py-4 bg-secondary shadow-xl">
        <Navbar />
      </div>
      <TagLineStrip className="shadow-xl" />
      <div className="container tagline-font mx-auto text-black px-8 mt-8 grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 min-h-screen gap-8">
        <div>
          <h1 className="text-4xl font-bold text-secondary uppercase">
            Basket
          </h1>
          {emptyBasket ? (
            <p className="text-xl mt-4">There are no items in your basket.</p>
          ) : (
            <div>{basketItems}</div>
          )}
        </div>
        <div>
          <h1 className="text-4xl text-secondary uppercase font-bold">Total</h1>
          <div className="flex items-center justify-between mt-4">
            <p className="text-m">Number of items:</p>
            <p className="text-m">{basketCount}</p>
          </div>
          <div className="flex items-center justify-between mt-4">
            <p className="text-m">Subtotal:</p>
            <p className="text-m">{price}</p>
          </div>
          {basketCount > 0 && (
            <>
              <div className="flex items-center justify-between mt-4">
                <p className="text-m">Shipping (Free over £25):</p>
                <p className="text-m">
                  {basketCount * 8.99 > 25 ? "Free" : `£${shippingPrice}`}
                </p>
              </div>
              <div className="flex items-center justify-between mt-4">
                <p className="text-xl">Total:</p>
                <p className="text-xl">
                  £{(basketCount * 8.99 + shippingPrice).toFixed(2)}
                </p>
              </div>
              <div className="flex items-center mt-4">
                <button
                  className="bg-black flex gap-2 text-white uppercase font-semibold rounded-full px-6 py-2 mt-4"
                  style={{ whiteSpace: "nowrap", overflow: "hidden" }}
                >
                  <span>Checkout</span>
                  <span>
                    <Right />
                  </span>
                </button>
              </div>
            </>
          )}
        </div>
      </div>
      <Footer className="mt-auto" />
    </>
  );
}
