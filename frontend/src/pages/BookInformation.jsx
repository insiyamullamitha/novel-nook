import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getBook, getImageFile } from "../components/FirebaseApp";
import Navbar from "../components/Navbar";
import TagLineStrip from "../components/TagLineStrip";
import Footer from "../components/Footer";
import { useBasket } from "../components/BasketContext";
import BasketIcon from "../icons/BasketIcon";
import TickIcon from "../icons/TickIcon";

export default function BookInformation({ user }) {
  const { bookTitle } = useParams();
  const [book, setBook] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [showMore, setShowMore] = useState(false);
  const [bookDescription, setBookDescription] = useState(
    "No Description available for this book."
  );
  const [bookAuthor, setBookAuthor] = useState(
    "No Author available for this book."
  );
  const [bookImagePath, setBookImagePath] = useState(null);
  const [loading, setLoading] = useState(true);
  const [ISBN, setISBN] = useState(null);
  const [descriptionFetched, setDescriptionFetched] = useState(false);
  const { addToBasket } = useBasket();
  const [addedToBasket, setAddedToBasket] = useState(false);

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedBook = await getBook(bookTitle);
        setBook(fetchedBook);

        const description =
          fetchedBook && fetchedBook.Description
            ? fetchedBook.Description
            : "No Description available for this book.";
        setBookDescription(description);

        const author =
          fetchedBook && fetchedBook.Author
            ? fetchedBook.Author
            : "No Author available for this book.";
        setBookAuthor(author);

        const isbn = fetchedBook && fetchedBook.ISBN ? fetchedBook.ISBN : null;
        setISBN(isbn);

        const imagePath = await getImageFile(bookTitle);
        setBookImagePath(imagePath);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching book information", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [bookTitle]);

  useEffect(() => {
    const fetchBookDescription = async (ISBN) => {
      try {
        const API_KEY = import.meta.env.VITE_REACT_APP_GOOGLE_BOOKS_API_KEY;
        const response = await fetch(
          "https://www.googleapis.com/books/v1/volumes?q=isbn=" +
            ISBN +
            "&key=" +
            API_KEY
        );
        if (!response.ok) {
          throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }
        const data = await response.json();
        if (data.items && data.items.length > 0) {
          const description = data.items[0].volumeInfo.description;
          setBookDescription(description);
        } else {
          throw new Error("No book found");
        }
      } catch (error) {
        console.error("Error fetching book description", error);
      } finally {
        setDescriptionFetched(true);
      }
    };

    if (ISBN && !descriptionFetched) {
      fetchBookDescription(ISBN);
    }
  }, [ISBN, descriptionFetched]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen">
      <div className="py-4 bg-secondary shadow-xl">
        <Navbar user={user} />
      </div>
      <TagLineStrip className="shadow-xl" />
      <div className="container mx-auto sm:mx-0 mt-8 p-8 grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-8">
        {bookImagePath && (
          <div className="relative mx-auto">
            <img
              className="max-h-80 rounded-md shadow-md"
              src={bookImagePath}
              alt={bookTitle}
            />
          </div>
        )}
        <div className="flex flex-col justify-start">
          <h1 className="text-3xl tagline-font uppercase text-black font-bold mb-4">
            {bookTitle.replace(/_/g, " ")}
          </h1>
          <div className="description-container">
            <p className="text-gray-700 tagline-font mb-4">
              {showMore
                ? bookDescription
                : `${bookDescription.slice(0, 200)}...`}
              {bookDescription.length > 200 && (
                <button
                  className="text-secondary hover:underline"
                  onClick={() => setShowMore(!showMore)}
                >
                  {showMore ? " Show less" : " Show more"}
                </button>
              )}
            </p>
          </div>
          <p className="text-black tagline-font">Author: {bookAuthor}</p>
          <p className="text-black tagline-font">ISBN: {ISBN}</p>
          <p className="text-black tagline-font">Price: £8.99</p>
          <div className="flex items-center gap-6 mt-4">
            <div className="flex bg-white items-center rounded-full">
              <button
                className={`text-black uppercase text-sm font-semibold rounded-l-full px-3 py-2 hover:font-bold hover:text-red-500 transition-all ${
                  addedToBasket ? "text-white" : ""
                }`}
                onClick={decreaseQuantity}
              >
                -
              </button>
              <span className="text-black uppercase text-sm font-semibold px-3 py-1">
                {quantity}
              </span>
              <div className="bg-white items-center rounded-full">
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
              className={`bg-black mt-4 mb-4 flex gap-2 text-white uppercase text-sm font-semibold rounded-full px-6 py-2 justify-center items-center tracking-wide hover:font-bold hover:bg-gray-800`}
              onClick={handleAddToBasket}
            >
              {addedToBasket ? (
                <>
                  <span>Added</span>
                  <TickIcon className={`spin`} />
                </>
              ) : (
                <>
                  <span>Add To Basket</span>
                  <BasketIcon />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}