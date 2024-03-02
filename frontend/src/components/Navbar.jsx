import { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import BasketIcon from "../icons/BasketIcon";
import { useBasket, calculateBasketCount } from "./BasketContext";
import SideBar from "./SideBar";
import SideBarIcon from "../icons/SideBarIcon";

export default function Navbar({ user }) {
  const location = useLocation();
  const { state } = useBasket();
  const basketCount = calculateBasketCount(state.items);
  const [showSidebar, setShowSidebar] = useState(false);

  const closeSideBar = () => {
    setShowSidebar(false);
  };

  return (
    <nav
      className="bg-primary px-8 container mx-auto max-w-full-lg bg-gray-800 p-2 rounded-full flex-wrap sm:flex-no-wrap"
      style={{ whiteSpace: "nowrap", overflow: "hidden" }}
    >
      <div className="flex justify-between items-center flex-wrap sm:flex-no-wrap">
        <NavLink to="/" className="logo-font text-2xl text-black">
          Novel Nook
        </NavLink>
        <div className="block sm:hidden">
          <button
            onClick={() => setShowSidebar(!showSidebar)}
            className="text-white p-2 focus:outline-none"
          >
            <SideBarIcon />
          </button>
        </div>
        <ul
          className={`flex space-x-4 items-center uppercase sm:flex ${
            showSidebar ? "hidden" : "hidden sm:flex"
          }`}
        >
          {!showSidebar && (
            <>
              <li>
                <NavLink
                  to="/"
                  className="tracking-wide nav-font text-black uppercase hover:font-bold"
                  style={{
                    fontWeight: location.pathname === "/" ? "bold" : "",
                  }}
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/books"
                  className="tracking-wide nav-font text-black uppercase hover:font-bold"
                  style={{
                    fontWeight: location.pathname === "/books" ? "bold" : "",
                  }}
                >
                  Books
                </NavLink>
              </li>
              {!user && (
                <>
                  <li>
                    <NavLink
                      to="/login"
                      className="tracking-wide nav-font text-black uppercase hover:font-bold"
                      style={{
                        fontWeight:
                          location.pathname === "/login" ||
                          location.pathname === "/signup"
                            ? "bold"
                            : "",
                      }}
                    >
                      Log In
                    </NavLink>
                  </li>
                </>
              )}
              {user && (
                <li>
                  <NavLink
                    to="/myprofile"
                    className="tracking-wide nav-font text-black uppercase hover:font-bold"
                    style={{
                      fontWeight:
                        location.pathname === "/myprofile" ? "bold" : "",
                    }}
                  >
                    Profile
                  </NavLink>
                </li>
              )}
              <li>
                <NavLink
                  to="/contact"
                  className="tracking-wide nav-font text-black uppercase hover:font-bold"
                  style={{
                    fontWeight: location.pathname === "/contact" ? "bold" : "",
                  }}
                >
                  Contact Us
                </NavLink>
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
      {showSidebar && <SideBar user={user} close={closeSideBar} />}
    </nav>
  );
}
