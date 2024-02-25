import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import TagLineStrip from "../components/TagLineStrip";
import BookItem from "../components/BookItem";
import Right from "../icons/Right";
import { Link } from "react-router-dom";
import { getUserWishlist } from "../components/FirebaseApp";
import Footer from "../components/Footer";

export default function MyWishlist(user) {
  const [likedBooks, setLikedBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchWishlist = async () => {
    const wishlist = await getUserWishlist(user.uid);
    return wishlist;
  };

  useEffect(() => {
    const fetchAndSetWishlist = async () => {
      const wishlist = await fetchWishlist();
      setLikedBooks(wishlist);
      setLoading(false);
    };
    fetchAndSetWishlist();
  }, []);

  return (
    <>
      <div className="py-4 bg-secondary shadow-xl">
        <div className="my-4">
          <Navbar user={user} />
        </div>
      </div>
      <TagLineStrip className="shadow-xl" />
      <h1 className="text-center text-secondary mt-12 tagline-font uppercase text-4xl">
        My Wishlist
      </h1>
      {likedBooks.length === 0 && (
        <div className="container flex flex-col mt-8 gap-4 mx-auto text-black items-center px-8">
          <p className="text-center tagline-font">
            You have no books in your wishlist.
          </p>
          <Link to="/books">
            <button className="bg-accent1 flex gap-2 text-black uppercase font-semibold rounded-full px-4 py-2 items-center my-4 tracking-wid hover:font-bold hover:bg-accent3 hover:text-white">
              Browse Books
              <Right />
            </button>
          </Link>
        </div>
      )}
      {loading ? (
        <div className="container mx-auto text-black tagline-font px-8">
          Loading...
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4 my-8 container mx-auto px-8">
          {likedBooks.map((book) => (
            <BookItem key={book.Title} book={book} />
          ))}
        </div>
      )}
      <div className="mt-16">
        <Footer />
      </div>
    </>
  );
}
