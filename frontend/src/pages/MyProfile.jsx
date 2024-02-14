import Navbar from "../components/Navbar";
import TagLineStrip from "../components/TagLineStrip";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import Right from "../icons/Right";

export default function MyProfile() {
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
          My Profile
        </h1>
        <div className="flex col-2 justify-center items-center gap-12 mt-8">
          <img
            src="https://via.placeholder.com/150"
            alt="profile"
            className="w-32 h-36"
          />
          <div>
            <h2 className="text-secondary tagline-font text-2xl">
              Insiya Mullamitha
            </h2>
            <p className="text-black">
              <span className="text-secondary">Email:</span>
              <span className="ml-2">
                <a href="mailto: test@example.com">test@example.com</a>
              </span>
            </p>
            <p className="text-black">
              <span className="text-secondary">Phone:</span>
              <span className="ml-2">123-456-7890</span>
            </p>
          </div>
        </div>
        <div className="flex gap-4 justify-center items-center mt-4">
          <button className="bg-secondary rounded-full p-2 mt-8">
            <Link to="/myorders" className="flex items-center">
              My Orders&nbsp;
              <Right />
            </Link>
          </button>
          <button className="bg-accent1 rounded-full p-2 mt-8">
            <Link to="/editprofile" className="flex items-center">
              Edit Profile&nbsp;
              <Right />
            </Link>
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
}
