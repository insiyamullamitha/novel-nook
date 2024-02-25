import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import TagLineStrip from "../components/TagLineStrip";
import Footer from "../components/Footer";
import BookItem from "../components/BookItem";
import { getBooks } from "../components/FirebaseApp";
import SearchBar from "../components/SearchBar";
import FilterIcon from "../icons/FilterIcon";

export default function BookMenu({ user }) {
  const [bookList, setBookList] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterMenu, setFilterMenu] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const books = await getBooks();
        setBookList(books);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching books:", error.code, error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const onSearch = (searchTerm) => {
    const searchWords = searchTerm.toLowerCase().split(" ");

    const filteredBooks = bookList.filter((book) =>
      searchWords.every((word) => book.Title.toLowerCase().includes(word))
    );

    setSearchResults(filteredBooks);
  };

  return (
    <>
      <div className="py-4 bg-secondary shadow-xl">
        <div className="my-4">
          <Navbar user={user} />
        </div>
      </div>
      <TagLineStrip className="shadow-xl" />
      <SearchBar onSearch={onSearch} />
      {loading ? (
        <div className="container mx-auto text-black tagline-font px-8">
          Loading...
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4 my-8 container mx-auto px-8">
          {(searchResults.length > 0 ? searchResults : bookList).map((book) => (
            <BookItem key={book.Title} book={book} />
          ))}
        </div>
      )}
      <Footer />
    </>
  );
}
