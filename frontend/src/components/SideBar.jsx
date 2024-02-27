import { Link } from "react-router-dom";
import HomeIcon from "../icons/HomeIcon";
import BookIcon from "../icons/BookIcon";
import UserIcon from "../icons/UserIcon";
import BasketIcon from "../icons/BasketIcon";
import EnvelopeIcon from "../icons/EnvelopeIcon";

export default function SideBar({ user, close }) {
  return (
    <div
      className="bg-secondary text-white w-1/2 h-screen fixed top-0 left-0 shadow-md z-50 transition-transform duration-600 ease-in-out transform"
      onClick={close}
    >
      <div className="flex flex-col items-center mt-16 h-full gap-4 uppercase nav-font text-black">
        <Link to="/" className="flex gap-2 items-center hover:bg-accent3">
          <HomeIcon />
          Home
        </Link>
        <Link to="/books" className="flex gap-2 items-center hover:bg-accent3">
          <BookIcon />
          Books
        </Link>
        {user ? (
          <>
            <Link
              to="/myprofile"
              className="flex gap-2 items-center hover:bg-accent3"
            >
              <UserIcon />
              Profile
            </Link>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="flex gap-2 items-center hover:bg-accent3"
            >
              <UserIcon />
              Login
            </Link>
          </>
        )}
        <Link to="/basket" className="flex gap-2 items-center hover:bg-accent3">
          <BasketIcon />
          Basket
        </Link>
        <Link
          to="/contact"
          className="flex gap-2 items-center hover:bg-accent3"
        >
          <EnvelopeIcon />
          Contact Us
        </Link>
      </div>
    </div>
  );
}
