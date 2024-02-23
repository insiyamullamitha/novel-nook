import { useEffect, useState } from "react";
import { getBookReviews } from "./FirebaseApp";

export default function ReviewSection({ bookTitle }) {
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    const fetchReviews = async () => {
      const fetchedReviews = await getBookReviews(bookTitle);
      setReviews(fetchedReviews);
    };
    fetchReviews();
  }, [bookTitle]);
  return (
    <section className="mt-8 mb-12">
      <div className="container mx-auto max-w-screen-lg px-8 text-center">
        <div className="tagline-font">
          <h2 className="text-4xl font-bold mb-8 uppercase text-secondary">
            Reviews
          </h2>
          <div className="flex flex-col gap-4">
            {reviews.map((review) => (
              <div key={review} className="flex flex-col gap-2">
                <p className="text-sm font-semibold">{review}</p>
              </div>
            ))}
            {reviews.length === 0 ? (
              <p className="text-m text-black">
                No reviews yet. Be the first to rate this book!
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
