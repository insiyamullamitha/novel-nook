import Navbar from "../components/Navbar";
import TagLineStrip from "../components/TagLineStrip";
import Footer from "../components/Footer";

export default function VerifyEmail() {
  return (
    <>
      <div className="py-4 bg-secondary shadow-xl">
        <div className="my-4">
          <Navbar />
        </div>
      </div>
      <TagLineStrip className="shadow-xl" />
      <div className="container tagline-font text-center mx-auto">
        <h1 className="text-4xl my-8 text-secondary font-bold uppercase">
          Verify Email
        </h1>
        <p className="text-m text-black mt-4">
          Thank you for registering for an account with Novel Nook! Please check
          your email to verify your account and make purchases.
        </p>
      </div>
      <Footer />
    </>
  );
}
