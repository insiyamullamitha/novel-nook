import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getBook, getImageFile } from "../components/FirebaseApp";
import Navbar from "../components/Navbar";
import TagLineStrip from "../components/TagLineStrip";
import Footer from "../components/Footer";

export default function BookInformation({ user }) {
  const { bookTitle } = useParams();
  const [book, setBook] = useState(null);
  const [bookDescription, setBookDescription] = useState(
    "No Description available for this book."
  );
  const [bookAuthor, setBookAuthor] = useState(
    "No Author available for this book."
  );
  const [bookImagePath, setBookImagePath] = useState(null);
  const [loading, setLoading] = useState(true);
  const [ISBN, setISBN] = useState(null);
  const [descriptionFetched, setDescriptionFetched] = useState(false); // New state

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
      <div className="container mx-auto text-black tagline-font px-8 mt-12 grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-4">
        <h1 className="uppercase m-auto">{bookTitle.replace(/_/g, " ")}</h1>
        <p className="m-auto">{bookDescription}</p>
        <p className="m-auto">{bookAuthor}</p>
        <p className="m-auto">ISBN: {ISBN}</p>
        {bookImagePath && (
          <div className="max-w-60 mb-12 m-auto">
            <img src={bookImagePath} alt={bookTitle} />
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
