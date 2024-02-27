import React, { useEffect, useState } from "react";
import { getImageFile } from "./FirebaseApp";

export default function ({ date, price, books, totalquantity }) {
  const formatTitle = (title) => title.replace(/_/g, " ");

  const [imageUrls, setImageUrls] = useState([]);

  useEffect(() => {
    const fetchImageUrls = async () => {
      const urls = await Promise.all(
        books.map(async (book) => {
          try {
            const url = await getImageFile(book.title);
            return url;
          } catch (error) {
            console.error(`Error fetching image for ${book.title}`, error);
            return null;
          }
        })
      );
      setImageUrls(urls);
    };

    fetchImageUrls();
  }, [books]);

  return (
    <div className="container mx-auto my-6 bg-white p-6 rounded-lg hover:shadow-xl transition-all">
      <h1 className="text-2xl font-bold text-accent1 mb-2">{date}</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {books.map((book, index) => (
          <div
            key={index}
            className="border bg-gray-100 p-4 rounded-md flex items-center"
          >
            <img
              src={imageUrls[index]}
              alt={`${formatTitle(book.title)} Image`}
              className="w-12 items-center rounded mr-4"
            />

            <div>
              <p className="text-m capitalize font-semibold">
                {formatTitle(book.title)}
              </p>
              <p className="text-xs text-gray-500">Quantity: {book.quantity}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center mt-2">
        <div className="flex items-center gap-2">
          <p className="text-gray-500">Total Quantity:</p>
          <p className="text-lg font-semibold">{totalquantity}</p>
        </div>

        <div className="flex items-center gap-2">
          <p className="text-gray-500">Total Price:</p>
          <p className="text-lg font-semibold">£{price}</p>
        </div>
      </div>
    </div>
  );
}
