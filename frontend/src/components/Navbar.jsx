import { Link } from "react-router-dom";
import BasketIcon from "../icons/BasketIcon";

export default function Navbar() {
  return (
    <nav className="bg-primary px-8 container mx-auto max-w-full-lg bg-gray-800 p-2 rounded-full flex-wrap sm:flex-no-wrap">
      <div className="flex justify-between items-center flex-wrap sm:flex-no-wrap">
        <Link to="/" className="logo-font text-2xl text-black">
          Novel Nook
        </Link>
        <ul className="flex space-x-4 items-center uppercase">
          <li>
            <Link
              to="/"
              className="tracking-wide nav-font text-black uppercase hover:font-bold"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/books"
              className="tracking-wide nav-font text-black uppercase hover:font-bold"
            >
              Books
            </Link>
          </li>
          <li>
            <Link
              to="/login"
              className="tracking-wide nav-font text-black uppercase hover:font-bold"
            >
              Log In
            </Link>
          </li>
          <li>
            <Link
              to="/signup"
              className="tracking-wide nav-font text-black uppercase hover:font-bold"
            >
              Sign Up
            </Link>
          </li>
        </ul>
        <div>
          <Link to="/basket" className="text-black">
            <BasketIcon />
          </Link>
        </div>
      </div>
    </nav>
  );
}
