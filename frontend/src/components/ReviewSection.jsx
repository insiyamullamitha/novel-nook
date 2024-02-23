import { useEffect, useState } from "react";
import { getBookReviews } from "./FirebaseApp";
import StarRating from "./StarRating";

export default function ReviewSection({ bookTitle }) {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const fetchedReviews = await getBookReviews(bookTitle);
        setReviews(fetchedReviews);
        console.log("Fetched Reviews:", fetchedReviews);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };
    fetchReviews();
  }, [bookTitle]);

  return (
    <section className="mt-4 mb-12">
      <div className="container max-w-screen-lg px-8 text-center">
        <h2 className="text-4xl font-bold mb-8 uppercase tagline-font text-accent3">
          Reviews
        </h2>
        {reviews.length === 0 ? (
          <p className="text-m text-black">
            No reviews yet. Be the first to rate this book!
          </p>
        ) : (
          <div className="flex flex-col justify-center gap-6">
            {reviews.map((reviewData, index) => (
              <div
                className="flex flex-col bg-accent2 p-4 rounded-lg items-center shadow-lg"
                key={index}
              >
                <StarRating value={reviewData.rating} />
                <p className="text-m text-white tagline-font font-semibold text-center">
                  {reviewData.review}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}