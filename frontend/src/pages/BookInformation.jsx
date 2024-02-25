import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getBook,
  getImageFile,
  getBookRating,
  addToWishlist,
  checkIfInWishlist,
  deleteFromWishlist,
} from "../components/FirebaseApp";
import Navbar from "../components/Navbar";
import TagLineStrip from "../components/TagLineStrip";
import Footer from "../components/Footer";
import { useBasket } from "../components/BasketContext";
import BasketIcon from "../icons/BasketIcon";
import TickIcon from "../icons/TickIcon";
import StarRating from "../components/StarRating";
import EmptyStarIcon from "../icons/EmptyStarIcon";
import ReviewInput from "../components/ReviewInput";
import { Link } from "react-scroll";
import ReviewSection from "../components/ReviewSection";
import HeartIcon from "../icons/HeartIcon";
import RedHeartIcon from "../icons/RedHeartIcon";

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
  const [writeReview, setWriteReview] = useState(false);
  const [bookRating, setBookRating] = useState(3);
  const [addedToWishlist, setAddedToWishlist] = useState(false);

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

  const handleWishlistButton = () => {
    if (user) {
      if (addedToWishlist) {
        confirm(
          "Are you sure you want to remove this book from your wishlist?"
        ) && deleteFromWishlist(user.uid, bookTitle);
        setAddedToWishlist(false);
      } else {
        addToWishlist(user.uid, bookTitle);
        setAddedToWishlist(true);
      }
    } else {
      alert("You must be logged in to add to your wishlist");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedBook = await getBook(bookTitle);
        setBook(fetchedBook);

        const author =
          fetchedBook && fetchedBook.Author
            ? fetchedBook.Author
            : "No Author available for this book.";
        setBookAuthor(author);

        const isbn = fetchedBook && fetchedBook.ISBN ? fetchedBook.ISBN : null;
        setISBN(isbn);

        const imagePath = await getImageFile(bookTitle);
        setBookImagePath(imagePath);

        if (user) {
          const inWishlist = await checkIfInWishlist(user.uid, bookTitle);
          setAddedToWishlist(inWishlist);
          setLoading(false);
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching book information", error);
        setLoading(false);
      }
    };

    const fetchRating = async () => {
      const fetchedRating = await getBookRating(bookTitle);
      setBookRating(fetchedRating);
    };

    fetchRating();
    fetchData();
  }, [bookTitle, user]);

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
          setBookDescription("No Description available for this book.");
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
    <div
      className="min-h-screen flex flex-col items-center justify-between"
      style={{ overflowX: "hidden" }}
    >
      <div className="py-4 bg-secondary shadow-xl w-full">
        <Navbar user={user} />
      </div>
      <TagLineStrip className="shadow-xl" />
      <div className="container mx-auto sm:mx-0 mt-8 p-8 grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-8">
        {bookImagePath && (
          <div className="relative text-2xl mx-auto">
            <img
              className="max-h-80 mb-4 rounded-md shadow-md"
              src={bookImagePath}
              alt={bookTitle}
            />
            <StarRating
              value={bookRating}
              className="items-center justify-center flex mx-auto"
            />
            <Link to="review-section" smooth={true} duration={500}>
              <button className="mt-4 w-55 mx-auto justify-center items-center flex gap-2 bg-black mb-4 text-white uppercase text-sm font-semibold rounded-full px-6 py-2 hover:font-bold hover:bg-gray-800">
                See Reviews <EmptyStarIcon />
              </button>
            </Link>
          </div>
        )}
        <div className="flex flex-col justify-start">
          <div className="flex flex-row gap-4 mt-4 h-9 mb-4 items-center text-secondary">
            <h1 className="text-3xl tagline-font uppercase text-accent2 font-bold">
              {bookTitle.replace(/_/g, " ")}
            </h1>
            <div
              className="text-black font-bold"
              onClick={handleWishlistButton}
            >
              {addedToWishlist ? <RedHeartIcon /> : <HeartIcon />}
            </div>
          </div>
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
          <p className="text-accent1 mt-4 tagline-font">Currently in stock</p>
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
      <div
        id="review-section"
        className="justify-center mx-auto container w-3/4"
      >
        <ReviewSection bookTitle={bookTitle} />
      </div>
      <button
        className="text-black flex gap-2 uppercase bg-accent1 text-sm font-semibold rounded-full px-6 py-2 mb-12 hover:font-bold hover:bg-accent2"
        onClick={() => setWriteReview(!writeReview)}
      >
        Write a Review
        <EmptyStarIcon />
      </button>
      <div className="justify-center flex mx-auto w-1/2 mb-12 container">
        {writeReview && <ReviewInput bookTitle={bookTitle} />}
      </div>
      <Footer />
    </div>
  );
}
