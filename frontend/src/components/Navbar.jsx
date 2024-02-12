import { Link } from "react-router-dom";

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
              className="tracking-wide nav-font text-black uppercase"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/books"
              className="tracking-wide nav-font text-black uppercase"
            >
              Books
            </Link>
          </li>
          <li>
            <Link
              to="/login"
              className="tracking-wide nav-font text-black uppercase"
            >
              Log In
            </Link>
          </li>
          <li>
            <Link
              to="/signup"
              className="tracking-wide nav-font text-black uppercase"
            >
              Sign Up
            </Link>
          </li>
        </ul>
        <div>
          <Link to="/basket" className="text-black">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-basket3-fill"
              viewBox="0 0 16 16"
            >
              <path d="M5.757 1.071a.5.5 0 0 1 .172.686L3.383 6h9.234L10.07 1.757a.5.5 0 1 1 .858-.514L13.783 6H15.5a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H.5a.5.5 0 0 1-.5-.5v-1A.5.5 0 0 1 .5 6h1.717L5.07 1.243a.5.5 0 0 1 .686-.172zM2.468 15.426.943 9h14.114l-1.525 6.426a.75.75 0 0 1-.729.574H3.197a.75.75 0 0 1-.73-.574z" />
            </svg>
          </Link>
        </div>
      </div>
    </nav>
  );
}
