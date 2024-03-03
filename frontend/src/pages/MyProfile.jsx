import Navbar from "../components/Navbar";
import TagLineStrip from "../components/TagLineStrip";
import Footer from "../components/Footer";
import { Link, useNavigate } from "react-router-dom";
import OrderIcon from "../icons/OrderIcon";
import UserIcon from "../icons/UserIcon";
import { auth } from "../components/FirebaseApp";
import HeartIcon from "../icons/HeartIcon";
import EnvelopeIcon from "../icons/EnvelopeIcon";

export default function MyProfile({ user, setUser }) {
  const handleLogout = () => {
    auth
      .signOut()
      .then(() => {
        setUser(null);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  if (!user) {
    return null;
  }
  return (
    <>
      <div className="py-4 bg-secondary shadow-xl">
        <div className="my-4">
          <Navbar user={user} />
        </div>
      </div>
      <TagLineStrip className="shadow-xl" />
      <div className="container py-8 text-center mx-auto px-8">
        <h1 className="text-secondary mt-4 tagline-font uppercase text-4xl">
          My Profile
        </h1>
        <p className="text-black tagline-font text-lg mt-8">
          Welcome, {user.email}!
        </p>
        <div className="flex flex-col lg:flex-row justify-center items-center gap-2 mt-8">
          <Link to="/myorders">
            <button
              className="lg:w-auto w-full md:flex md:gap-2 bg-accent2 justify-center items-center text-black uppercase font-semibold rounded-full px-4 py-2 my-4 tracking-wide hover:font-bold shadow-md"
              style={{ whiteSpace: "nowrap", overflow: "hidden" }}
            >
              <span className="flex items-center">
                My Orders&nbsp;&nbsp;
                <OrderIcon className="ml-2" />
              </span>
            </button>
          </Link>
          <Link to="/mywishlist">
            <button
              className="lg:w-auto w-full bg-accent4 justify-center items-center text-black uppercase font-semibold rounded-full px-4 py-2 my-4 tracking-wid hover:font-bold shadow-md"
              style={{ whiteSpace: "nowrap", overflow: "hidden" }}
            >
              <span className="flex items-center">
                My Wishlist&nbsp;&nbsp;
                <HeartIcon className="ml-2" />
              </span>
            </button>
          </Link>
          <Link to="/login">
            <button
              type="submit"
              onClick={handleLogout}
              className="lg:w-auto w-full bg-accent1 justify-center items-center text-black uppercase font-semibold rounded-full px-4 py-2 my-4 tracking-wide hover:font-bold shadow-md"
              style={{ whiteSpace: "nowrap", overflow: "hidden" }}
            >
              <span className="flex items-center">
                Log Out&nbsp;&nbsp;
                <UserIcon className="ml-2" />
              </span>
            </button>
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
}
