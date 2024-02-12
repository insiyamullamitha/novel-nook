import React from "react";
import Right from "../icons/Right";
import { Link } from "react-router-dom";

export default function About() {
  return (
    <section className="my-16" id="aboutSection">
      <div className="container mx-auto max-w-screen-lg px-8 text-center">
        <div className="tagline-font">
          <h2 className="text-4xl font-bold mb-8 uppercase text-secondary">
            About Us
          </h2>
          <p className="text-lg mb-6">
            Welcome to Novel Nook, your go-to destination for a delightful
            literary journey. We are passionate about connecting readers with
            captivating stories that spark joy, curiosity, and imagination.
          </p>
          <p className="text-lg mb-6">
            At Novel Nook, we curate a diverse collection of books across
            genres, ensuring there's something for every mood and preference.
            Our team of book enthusiasts is dedicated to bringing you the latest
            releases, timeless classics, and hidden gems that you won't find
            just anywhere.
          </p>
          <p className="text-lg mb-6">
            Join us in discovering the magic of storytelling. Fuel your
            curiosity, find joy in every chapter, and let Novel Nook be your
            trusted companion on your reading adventures.
          </p>
        </div>
        <Link to="/books">
          <button
            className="bg-accent1 mt-2 flex gap-2 text-black uppercase font-bold rounded-full px-6 py-2 justify-center items-center m-auto tracking-wide"
            style={{ whiteSpace: "nowrap", overflow: "hidden" }}
          >
            Find Your Next Read
            <Right />
          </button>
        </Link>
      </div>
    </section>
  );
}
