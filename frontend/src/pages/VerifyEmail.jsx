import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import TagLineStrip from "../components/TagLineStrip";
import EnvelopeIcon from "../icons/EnvelopeIcon";
import UserIcon from "../icons/UserIcon";
import { sendEmailVerification } from "firebase/auth";
import { auth } from "../components/FirebaseApp";
import { useEffect } from "react";

export default function VerifyEmail({ user, setUser }) {
  const resendEmailVerification = () => {
    sendEmailVerification(user).then(() => {
      alert("Email verification sent");
    });
  };

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

  useEffect(() => {
    window.location.reload();
  }, []);

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
          Verify Email
        </h1>
        <p className="text-black tagline-font mt-8">
          A verification email has been sent to your email address. Please
          verify your email to continue.
        </p>
      </div>
      <div className="flex justify-center font-semibold space-x-4">
        <button
          onClick={resendEmailVerification}
          className="flex gap-2 items-center bg-accent2 uppercase text-white py-2 px-4 rounded-full shadow-md hover:font-bold"
        >
          Resend Email
          <EnvelopeIcon />
        </button>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 bg-accent1 uppercase text-white py-2 px-4 rounded-full shadow-md hover:font-bold"
        >
          Log Out
          <UserIcon />
        </button>
      </div>
      <Footer />
    </>
  );
}
