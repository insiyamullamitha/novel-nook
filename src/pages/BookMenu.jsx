import { useEffect, useState } from "react"; // Import useEffect and useState

import Navbar from "../components/Navbar";
import TagLineStrip from "../components/TagLineStrip";
import Footer from "../components/Footer";
import BookItem from "../components/BookItem";
import { getBooks } from "../components/FirebaseApp";

export default function BookMenu({ user }) {
  const [bookList, setBookList] = useState([]); // Create a state for bookList

  useEffect(() => {
    const fetchBooks = async () => {
      const books = await getBooks();
      const sortedBooks = books.sort((a, b) => a.Title.localeCompare(b.Title));
      setBookList(sortedBooks);
    };

    fetchBooks();
  }, []);

  return (
    <>
      <div className="py-4 bg-secondary shadow-xl">
        <div className="my-4">
          <Navbar user={user} />
        </div>
      </div>
      <TagLineStrip className="shadow-xl" />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4 my-16 container mx-auto px-8">
        {bookList.map((book) => {
          return <BookItem key={book.Title} bookTitle={book.Title} />;
        })}
      </div>
      <Footer />
    </>
  );
}
