import { Link, useLocation } from "react-router-dom";
import BasketIcon from "../icons/BasketIcon";
import { useBasket, calculateBasketCount } from "./BasketContext";

export default function Navbar({ user }) {
  const location = useLocation();
  const { state } = useBasket();
  const basketCount = calculateBasketCount(state.items);

  const isActive = (path) => {
    return location.pathname === path ? "font-bold" : "";
  };

  return (
    <nav
      className="bg-primary px-8 container mx-auto max-w-full-lg bg-gray-800 p-2 rounded-full flex-wrap sm:flex-no-wrap"
      style={{ whiteSpace: "nowrap", overflow: "hidden" }}
    >
      <div className="flex justify-between items-center flex-wrap sm:flex-no-wrap">
        <Link to="/" className="logo-font text-2xl text-black">
          Novel Nook
        </Link>
        <ul className="flex space-x-4 items-center uppercase">
          <li>
            <Link
              to="/"
              className={`tracking-wide nav-font text-black uppercase hover:font-bold active:font-bold ${isActive(
                "/"
              )}`}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/books"
              className={`tracking-wide nav-font text-black uppercase hover:font-bold active:font-bold ${isActive(
                "/books"
              )}`}
            >
              Books
            </Link>
          </li>
          {!user && (
            <>
              <li>
                <Link
                  to="/login"
                  className={`tracking-wide nav-font text-black uppercase hover:font-bold active:font-bold ${isActive(
                    "/login"
                  )}`}
                >
                  Log In
                </Link>
              </li>
              <li>
                <Link
                  to="/signup"
                  className={`tracking-wide nav-font text-black uppercase hover:font-bold active:font-bold ${isActive(
                    "/signup"
                  )}`}
                >
                  Sign Up
                </Link>
              </li>
            </>
          )}
          {user && (
            <>
              <li>
                <Link
                  to="/myprofile"
                  className={`tracking-wide nav-font text-black uppercase hover:font-bold active:font-bold ${isActive(
                    "/myprofile"
                  )}`}
                >
                  Profile
                </Link>
              </li>
            </>
          )}
        </ul>
        <div className="relative">
          <Link to="/basket" className="text-black">
            <BasketIcon />
            {basketCount > 0 && (
              <div className="absolute -top-3 -right-3 bg-accent1 rounded-full p-1 w-5 h-5 flex items-center justify-center text-xs text-white">
                {basketCount < 10 ? basketCount : "9+"}
              </div>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
}
