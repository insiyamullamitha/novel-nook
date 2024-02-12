import Navbar from "../components/Navbar";
import TagLineStrip from "../components/TagLineStrip";
import Footer from "../components/Footer";
import Right from "../icons/Right";
import { Link } from "react-router-dom";

export default function LogIn() {
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
          Log In
        </h1>
        <p className="text-black mt-4">
          Welcome back! Log in to your account to access all your books.
        </p>
        <form className="mt-8 max-w-sm m-auto">
          <div className="flex flex-col gap-4">
            <input
              type="email"
              placeholder="Email"
              className="border-2 border-black rounded-lg p-3"
            />
            <input
              type="password"
              placeholder="Password"
              className="border-2 border-black rounded-lg p-3"
            />
            <button
              type="submit"
              className="flex gap-2 bg-black text-white uppercase font-semibold rounded-full px-6 py-2 justify-center items-center m-auto tracking-wide"
              style={{ whiteSpace: "nowrap", overflow: "hidden" }}
            >
              Log In
              <Right />
            </button>
          </div>
        </form>
        <p className="text-black mt-4">
          Don't have an account?{" "}
          <Link to="/signup" className="text-accent1">
            Sign Up
          </Link>
        </p>
      </div>
      <Footer />
    </>
  );
}
