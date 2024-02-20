import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import TagLineStrip from "../components/TagLineStrip";
import Footer from "../components/Footer";
import BookItem from "../components/BookItem";
import { getBooks } from "../components/FirebaseApp";

export default function BookMenu({ user }) {
  const [bookList, setBookList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const books = await getBooks();
        setBookList(books);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching books:", error.code, error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="py-4 bg-secondary shadow-xl">
        <div className="my-4">
          <Navbar user={user} />
        </div>
      </div>
      <TagLineStrip className="shadow-xl" />
      {loading ? (
        <div className="mt-8 container mx-auto text-black tagline-font px-8">
          Loading...
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4 my-16 container mx-auto px-8">
          {bookList.map((book) => {
            return <BookItem key={book.Title} book={book} />;
          })}
        </div>
      )}
      <Footer />
    </>
  );
}
