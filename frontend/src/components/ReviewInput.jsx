import { useState } from "react";
import Right from "../icons/Right";
import { saveBookReviewToFirestore } from "./FirebaseApp";
import ControlledStarRating from "./ControlledStarRating";

export default function ReviewInput({ bookTitle }) {
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(5);

  const submitReview = async (e) => {
    e.preventDefault();
    if (review.length < 5) {
      alert("Reviews must be at least 5 characters long");
      return;
    }
    await saveBookReviewToFirestore(bookTitle, review, rating);
    setReview("");
    setRating(5);
    window.location.reload();
  };

  return (
    <div className="container max-w-screen-lg px-4 sm:px-8 mx-auto flex text-black text-sm flex-col gap-4">
      <form className="flex flex-col gap-4">
        <ControlledStarRating
          onChange={setRating}
          className="justify-center flex mx-auto"
        />
        <textarea
          id="review"
          name="review"
          className="border bg-white tagline-font border-gray-300 focus:border-accent1 focus:outline-none rounded-lg sm:w-full h-32 md:h-40 p-2"
          placeholder="Write your anonymous review here"
          onChange={(e) => setReview(e.target.value)}
          value={review}
        ></textarea>
        <button
          onClick={submitReview}
          className="mt-4 mx-auto sm:w-3/4 lg:w-2/3 justify-center items-center flex gap-2 bg-secondary mb-8 text-black uppercase text-m font-semibold rounded-full px-4 sm:px-6 py-2 hover:font-bold hover:bg-accent2"
        >
          Submit <Right />
        </button>
      </form>
    </div>
  );
}
