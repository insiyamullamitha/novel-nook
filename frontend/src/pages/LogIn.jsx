import Navbar from "../components/Navbar";
import TagLineStrip from "../components/TagLineStrip";
import Footer from "../components/Footer";
import Right from "../icons/Right";
import { Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../components/FirebaseApp";
import { useState } from "react";
import { getDoc, doc } from "firebase/firestore/lite";
import { Navigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function LogIn({ user, setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const getUserDataFromFirestore = async (uid, setUser) => {
    try {
      const userDoc = await getDoc(doc(db, "User", uid));
      if (userDoc.exists) {
        const userData = userDoc.data();
        setUser({
          uid,
          email: userData.email,
          fullName: userData.fullName,
        });
      }
      Navigate("/myprofile");
    } catch (error) {
      toast.error("Something went wrong");
      window.location.reload();
    }
  };

  const onLogin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        getUserDataFromFirestore(user.uid, setUser);
      })
      .catch((error) => {
        const errorCode = error.code;
        if (
          errorCode === "auth/wrong-password" ||
          errorCode === "auth/user-not-found"
        ) {
          toast.error("The email or password is incorrect. Please try again.");
        }
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
        <div className="max-w-md m-auto">
          <h1 className="text-secondary tagline-font uppercase text-4xl mb-4">
            Log In
          </h1>
          <p className="tagline-font text-black">
            Welcome back! Log in to your account to access all your books.
          </p>
          <form className="mt-8">
            <div className="flex flex-col text-black gap-4">
              <input
                type="email"
                className="border-2 bg-white border-black rounded-lg p-3 focus:outline-none focus:border-accent1"
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
              />
              <input
                type="password"
                placeholder="Password"
                className="border-2 bg-white border-black rounded-lg p-3 focus:outline-none focus:border-accent1"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="submit"
                onClick={onLogin}
                className="flex gap-2 bg-black text-white uppercase font-semibold rounded-full px-6 py-2 justify-center items-center m-auto tracking-wide hover:bg-accent1 hover:font-bold shadow-md focus:outline-none"
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
      </div>
      <Footer />
    </>
  );
}
