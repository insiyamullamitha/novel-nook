import React from "react";

export default function BasketItem({ bookTitle, quantity }) {
  return (
    <div className="my-4 bg-white shadow-xl rounded-lg p-4 flex items-center justify-between">
      <div className="flex items-center gap-8">
        <img
          className="max-h-24 block"
          src={`/${bookTitle}.png`}
          alt={`${bookTitle} cover`}
        />
        <div>
          <h3 className="text-xl text-black font-semibold">{bookTitle}</h3>
          <p className="text-gray-500">Price: £8.99</p>
        </div>
      </div>
      <div>
        <p className="text-gray-500">Quantity: </p>
        <form>
          <select
            className="bg-white border-2 border-gray-200 text-black font-semibold"
            value={quantity}
            readOnly
          >
            {[1, 2, 3].map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </form>
      </div>
      <button className="text-red-500 font-semibold">Remove</button>
    </div>
  );
}
