import Navbar from "../components/Navbar";
import TagLineStrip from "../components/TagLineStrip";
import EnvelopeIcon from "../icons/EnvelopeIcon";
import Footer from "../components/Footer";

export default function Contact({ user }) {
  return (
    <>
      <div className="py-4 bg-secondary shadow-xl">
        <div className="my-4">
          <Navbar user={user} />
        </div>
      </div>
      <TagLineStrip className="shadow-xl" />
      <div className="container mx-auto py-8 mt-4 text-black">
        <h1 className="tagline-font font-bold text-4xl justify-center flex text-secondary mb-4 text-black uppercase">
          Contact Us
        </h1>
        <div className="flex flex-col items-center mt-4 px-8">
          <p className="tagline-font text-lg text-center mb-4 container">
            We would love to hear from you! Please feel free to contact us with
            any questions or feedback.
          </p>
          <a
            href="mailto:"
            className="flex gap-2 items-center py-2 bg-accent1 text-black font-semibold uppercase px-4 rounded-full mt-4 md:mt-0 hover:font-bold shadow-md tracking-wide focus:outline-none"
            style={{ whiteSpace: "nowrap", overflow: "hidden" }}
          >
            <EnvelopeIcon />
            Email Us
          </a>
        </div>
      </div>
      <Footer />
    </>
  );
}
