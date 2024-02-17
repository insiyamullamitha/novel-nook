import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import TagLineStrip from "../components/TagLineStrip";
import Footer from "../components/Footer";
import Right from "../icons/Right";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../components/FirebaseApp";
import { useState } from "react";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function onSubmit(e) {
    e.preventDefault();

    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        navigate("/verify-email");
      })
      .catch((error) => {
        const errorCode = error.code;
        if (errorCode === "auth/email-already-in-use") {
          alert(
            "The email address is already in use by another account. Please log in."
          );
          navigate("/login");
        } else if (errorCode === "auth/invalid-email") {
          alert("The email address is invalid.");
        } else if (errorCode === "auth/weak-password") {
          alert("The password is too weak.");
        }
      });
  }
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
              required
            />
            <input
              type="email"
              placeholder="Email"
              className="border-2 border-black bg-white rounded-lg p-3"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className="border-2 border-black bg-white rounded-lg p-3"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
            <Link to="/verify-email">
              <button
                type="submit"
                onClick={onSubmit}
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
