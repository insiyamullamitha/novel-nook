import Navbar from "../components/Navbar";
import TagLineStrip from "../components/TagLineStrip";
import Footer from "../components/Footer";
import Right from "../icons/Right";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../components/FirebaseApp";
import { useState } from "react";
import UserIcon from "../icons/UserIcon";

export default function LogIn({ user }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogout = () => {
    auth
      .signOut()
      .then(() => {
        setUser(null);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onLogin = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setUser(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert("The email or password is incorrect. Please try again.");
      });
  };
  return (
    <>
      <div className="py-4 bg-secondary shadow-xl">
        <div className="my-4">
          <Navbar user={user} />
        </div>
      </div>
      <TagLineStrip className="shadow-xl" />
      <div className="container py-8 text-center mx-auto px-8">
        {user ? (
          <p className="text-black mt-4">
            Welcome back, {user.email}! You are logged in.
            <button
              type="submit"
              onClick={handleLogout}
              className="flex gap-2 bg-black text-white uppercase font-semibold rounded-full px-6 mt-4 py-2 justify-center items-center m-auto tracking-wide"
              style={{ whiteSpace: "nowrap", overflow: "hidden" }}
            >
              Log Out
              <UserIcon />
            </button>
          </p>
        ) : (
          <div>
            <h1 className="text-secondary tagline-font uppercase text-4xl">
              Log In
            </h1>
            <p className="text-black mt-4">
              Welcome back! Log in to your account to access all your books.
            </p>
            <form className="mt-8 max-w-sm m-auto">
              <div className="flex flex-col text-black gap-4">
                <input
                  type="email"
                  placeholder="Email"
                  className="border-2 bg-white border-black rounded-lg p-3"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <input
                  type="password"
                  placeholder="Password"
                  className="border-2 bg-white border-black rounded-lg p-3"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="submit"
                  onClick={onLogin}
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
        )}
      </div>
      <Footer />
    </>
  );
}
