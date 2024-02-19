import Navbar from "../components/Navbar";
import TagLineStrip from "../components/TagLineStrip";
import Footer from "../components/Footer";
import { Link, useNavigate } from "react-router-dom";
import OrderIcon from "../icons/OrderIcon";
import UserIcon from "../icons/UserIcon";
import { useEffect } from "react";
import { auth } from "../components/FirebaseApp";

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
        <div className="flex col-2 justify-center items-center gap-12 mt-12">
          <div>
            <h2 className="text-accent1 tagline-font text-2xl">
              {user.fullName}
            </h2>
            <p className="text-black">
              <span className="text-secondary">Email:</span>
              <span className="ml-2">
                <a href="mailto: test@example.com">{user.email}</a>
              </span>
            </p>
          </div>
        </div>
        <div className="flex gap-4 justify-center items-center mt-12">
          <Link to="/myorders">
            <button
              className="flex gap-2 bg-accent2 text-black uppercase font-bold rounded-full px-4 py-2 items-center my-4 tracking-wide"
              style={{ whiteSpace: "nowrap", overflow: "hidden" }}
            >
              My Orders
              <OrderIcon />
            </button>
          </Link>
          <Link to="/login">
            <button
              type="submit"
              onClick={handleLogout}
              className="flex gap-2 bg-accent1 text-black uppercase font-bold rounded-full px-4 py-2 items-center my-4 tracking-wide"
              style={{ whiteSpace: "nowrap", overflow: "hidden" }}
            >
              Log Out
              <UserIcon />
            </button>
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
}
