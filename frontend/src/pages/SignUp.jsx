import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import TagLineStrip from "../components/TagLineStrip";
import Footer from "../components/Footer";
import Right from "../icons/Right";

export default function SignUp() {
  return (
    <>
      <div className="py-4 bg-secondary shadow-xl">
        <div className="my-4">
          <Navbar />
        </div>
      </div>
      <TagLineStrip className="shadow-xl" />
      <div className="container py-8 text-center mx-auto px-8">
        <h1 className="text-secondary tagline-font uppercase text-4xl">
          Sign Up
        </h1>
        <p className="text-black mt-4">
          Welcome to Novel Nook! Sign up to create an account and start shopping
          for your favourite books.
        </p>
        <form className="mt-8 max-w-sm m-auto">
          <div className="flex flex-col text-black gap-4">
            <input
              type="text"
              placeholder="Full Name"
              className="border-2 border-black bg-white rounded-lg p-3"
            />
            <input
              type="email"
              placeholder="Email"
              className="border-2 border-black bg-white rounded-lg p-3"
            />
            <input
              type="password"
              placeholder="Password"
              className="border-2 border-black bg-white rounded-lg p-3"
            />
            <Link to="/verify-email">
              <button
                type="submit"
                className="flex gap-2 bg-black text-white uppercase font-semibold rounded-full px-6 py-2 justify-center items-center m-auto tracking-wide"
                style={{ whiteSpace: "nowrap", overflow: "hidden" }}
              >
                Sign Up
                <Right />
              </button>
            </Link>
          </div>
        </form>
        <p className="text-black mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-accent1">
            Log In
          </Link>
        </p>
      </div>
      <Footer />
    </>
  );
}
