import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import TagLineStrip from "../components/TagLineStrip";
import Footer from "../components/Footer";
import Right from "../icons/Right";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { auth, saveUserDataToFirestore } from "../components/FirebaseApp";
import { useState } from "react";
import toast from "react-hot-toast";

export default function SignUp({ user, setUser }) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function onSubmit(e) {
    e.preventDefault();

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await saveUserDataToFirestore(userCredential.user.uid, fullName, email);

      setUser({
        uid: userCredential.user.uid,
        fullName: fullName,
        email: email,
      });
      sendEmailVerification(auth.currentUser).then(() => {
        toast("Email verification sent", { icon: "💌" });
      });
      navigate("/profile");
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    }
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
        {user ? (
          navigate("/login")
        ) : (
          <div className="max-w-md m-auto">
            <h1 className="text-secondary tagline-font uppercase text-4xl mb-4">
              Sign Up
            </h1>
            <p className="text-black tagline-font">
              Welcome to Novel Nook! Sign up to create an account and start
              shopping for your favourite books.
            </p>
            <form className="mt-8">
              <div className="flex flex-col text-black gap-4">
                <input
                  type="text"
                  placeholder="Full Name"
                  className="border-2 border-black bg-white rounded-lg p-3 focus:outline-none focus:border-accent1"
                  required
                  onChange={(e) => setFullName(e.target.value)}
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="border-2 border-black bg-white rounded-lg p-3 focus:outline-none focus:border-accent1"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  type="password"
                  placeholder="Password"
                  className="border-2 border-black bg-white rounded-lg p-3 focus:outline-none focus:border-accent1"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="submit"
                  onClick={onSubmit}
                  className="flex gap-2 bg-black text-white uppercase font-semibold rounded-full px-6 py-2 justify-center items-center m-auto tracking-wide hover:bg-accent1 hover:font-bold shadow-md focus:outline-none"
                >
                  Sign Up
                  <Right />
                </button>
              </div>
            </form>
            <p className="text-black mb-8 mt-4">
              Already have an account?{" "}
              <Link to="/login" className="text-accent1">
                Log In
              </Link>
            </p>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}
