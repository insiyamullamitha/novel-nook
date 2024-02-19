import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import TagLineStrip from "../components/TagLineStrip";
import BasketItem from "../components/BasketItem";
import Footer from "../components/Footer";
import MoneyIcon from "../icons/MoneyIcon";
import { useBasket, calculateBasketCount } from "../components/BasketContext";
import DiscountCodeInput from "../components/DiscountCodeInput";
import BasketIcon from "../icons/BasketIcon";
import { Link } from "react-router-dom";
import StripeContainer from "../components/StripeContainer";

export default function Basket({ user }) {
  const { state } = useBasket();
  const emptyBasket = state.items.length === 0;
  const [basketItems, setBasketItems] = useState([]);
  const [price, setPrice] = useState(
    `£${(calculateBasketCount(state.items) * 8.99).toFixed(2)}`
  );
  const [shippingPrice, setShippingPrice] = useState(3.99);
  const basketCount = calculateBasketCount(state.items);
  const [checkout, setCheckout] = useState(false);

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
    setPrice((basketCount * 8.99).toFixed(2));
    setShippingPrice(basketCount * 8.99 > 25 ? 0 : 3.99);
  }, [state.items, emptyBasket, basketCount]);

  return (
    <div className="min-h-screen">
      <div className="py-4 bg-secondary shadow-xl">
        <Navbar user={user} />
      </div>
      <TagLineStrip className="shadow-xl" />
      <div className="container mx-auto text-black px-8 mt-8 grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-8">
        <div>
          <h1 className="text-4xl tagline-font font-bold text-secondary uppercase">
            Basket
          </h1>
          {emptyBasket ? (
            <>
              <p className="text-xl tagline-font mt-4">
                There are no items in your basket.
              </p>
              <Link to="/books" className="text-accent1">
                <button
                  type="submit"
                  className="flex gap-2 bg-black text-white uppercase font-semibold rounded-full px-6 py-2 items-center my-4 tracking-wide"
                  style={{ whiteSpace: "nowrap", overflow: "hidden" }}
                >
                  Continue Shopping
                  <BasketIcon />
                </button>
              </Link>
            </>
          ) : (
            <div>{basketItems}</div>
          )}
        </div>
        {!emptyBasket && (
          <div>
            <h1 className="text-4xl tagline-font text-secondary uppercase font-bold">
              Total
            </h1>
            <div className="flex items-center justify-between mt-5 tagline-font">
              <p className="text-m">Number of items:</p>
              <p className="text-m">{basketCount}</p>
            </div>
            <div className="flex items-center justify-between mt-4 tagline-font">
              <p className="text-m">Subtotal:</p>
              <p className="text-m">£{price}</p>
            </div>
            <div className="flex items-center justify-between mt-4 tagline-font">
              <p className="text-m">Shipping (Free over £25):</p>
              <p className="text-m">
                {basketCount * 8.99 > 25 ? "Free" : `£${shippingPrice}`}
              </p>
            </div>
            <div className="flex items-center justify-between mt-4 tagline-font">
              <p className="text-xl">Total:</p>
              <p className="text-xl">
                £{(basketCount * 8.99 + shippingPrice).toFixed(2)}
              </p>
            </div>
            {!checkout ? (
              <>
                <DiscountCodeInput />
                <div className="flex items-center mt-4">
                  <button
                    className="bg-black flex gap-2 text-white uppercase font-semibold rounded-full mb-12 px-6 py-2"
                    style={{ whiteSpace: "nowrap", overflow: "hidden" }}
                    onClick={() => setCheckout(!checkout)}
                  >
                    Checkout
                    <span>
                      <MoneyIcon />
                    </span>
                  </button>
                </div>
              </>
            ) : (
              <div>
                <StripeContainer
                  price={(basketCount * 8.99 + shippingPrice).toFixed(2)}
                />
                <button
                  onClick={() => setCheckout(!checkout)}
                  className="bg-black flex gap-2 mx-auto text-white uppercase font-semibold rounded-full px-6 py-2 mb-12"
                >
                  Cancel
                  <MoneyIcon />
                </button>
              </div>
            )}
          </div>
        )}
      </div>
      <Footer className="mt-auto" />
    </div>
  );
}
