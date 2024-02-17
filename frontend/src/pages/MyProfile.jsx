import Navbar from "../components/Navbar";
import TagLineStrip from "../components/TagLineStrip";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import Right from "../icons/Right";
import OrderIcon from "../icons/OrderIcon";
import UserIcon from "../icons/UserIcon";

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
            <h2 className="text-accent1 tagline-font text-2xl">
              Insiya Mullamitha
            </h2>
            <p className="text-black">
              <span className="text-secondary">Email:</span>
              <span className="ml-2">
                <a href="mailto: test@example.com">test@example.com</a>
              </span>
            </p>
          </div>
        </div>
        <div className="flex gap-4 justify-center items-center mt-4">
          <Link to="/myorders">
            <button
              className="flex gap-2 bg-secondary text-black uppercase font-bold rounded-full px-4 py-2 items-center my-4 tracking-wide"
              style={{ whiteSpace: "nowrap", overflow: "hidden" }}
            >
              My Orders
              <OrderIcon />
            </button>
          </Link>
          <Link to="/editprofile">
            <button
              className="flex gap-2 bg-accent1 text-black uppercase font-bold rounded-full px-4 py-2 items-center my-4 tracking-wide"
              style={{ whiteSpace: "nowrap", overflow: "hidden" }}
            >
              Edit Profile
              <UserIcon />
            </button>
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
}
