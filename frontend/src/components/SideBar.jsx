import { Link, useLocation } from "react-router-dom";
import HomeIcon from "../icons/HomeIcon";
import BookIcon from "../icons/BookIcon";
import UserIcon from "../icons/UserIcon";
import BasketIcon from "../icons/BasketIcon";
import EnvelopeIcon from "../icons/EnvelopeIcon";

export default function SideBar({ user, close }) {
  const location = useLocation();
  return (
    <div
      className="bg-secondary text-white max-w-64 w-1/2 h-screen fixed top-0 left-0 shadow-md z-50 transition-transform duration-600 ease-in-out transform"
      onClick={close}
    >
      <div className="flex flex-col items-center mt-16 h-full gap-4 uppercase nav-font text-black">
        <Link
          to="/"
          className={`flex gap-2 items-center hover:bg-accent2 hover:px-4 hover:py-1 hover:font-bold hover:rounded-full
          ${
            location.pathname === "/"
              ? "bg-accent2 px-4 py-1 font-bold rounded-full"
              : ""
          }`}
        >
          <HomeIcon />
          Home
        </Link>
        <Link
          to="/books"
          className={`flex gap-2 items-center hover:bg-accent2 hover:px-4 hover:py-1 hover:font-bold hover:rounded-full
          ${
            location.pathname === "/books"
              ? "bg-accent2 px-4 py-1 font-bold rounded-full"
              : ""
          }`}
        >
          <BookIcon />
          Books
        </Link>
        {user ? (
          <>
            <Link
              to="/myprofile"
              className={`flex gap-2 items-center hover:bg-accent2 hover:px-4 hover:py-1 hover:font-bold hover:rounded-full
          ${
            location.pathname === "/myprofile"
              ? "bg-accent2 px-4 py-1 font-bold rounded-full"
              : ""
          }`}
            >
              <UserIcon />
              Profile
            </Link>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className={`flex gap-2 items-center hover:bg-accent2 hover:px-4 hover:py-1 hover:font-bold hover:rounded-full
          ${
            location.pathname === "/login"
              ? "bg-accent2 px-4 py-1 font-bold rounded-full"
              : ""
          }`}
            >
              <UserIcon />
              Login
            </Link>
          </>
        )}
        <Link
          to="/basket"
          className={`flex gap-2 items-center hover:bg-accent2 hover:px-4 hover:py-1 hover:font-bold hover:rounded-full
          ${
            location.pathname === "/basket"
              ? "bg-accent2 px-4 py-1 font-bold rounded-full"
              : ""
          }`}
        >
          <BasketIcon />
          Basket
        </Link>
        <Link
          to="/contact"
          className={`flex gap-2 items-center hover:bg-accent2 hover:px-4 hover:py-1 hover:font-bold hover:rounded-full
          ${
            location.pathname === "/contact"
              ? "bg-accent2 px-4 py-1 font-bold rounded-full"
              : ""
          }`}
        >
          <EnvelopeIcon />
          Contact Us
        </Link>
      </div>
    </div>
  );
}
