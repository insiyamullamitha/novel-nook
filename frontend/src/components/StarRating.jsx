import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

export default function StarRating({ rating }) {
  const stars = [];
  for (let i = 0; i < 5; i++) {
    if (i < rating) {
      stars.push(
        <FontAwesomeIcon
          key={i}
          className="icon mx-1 text-yellow-500"
          icon={faStar}
        />
      );
    } else {
      stars.push(
        <FontAwesomeIcon
          key={i}
          className="icon mx-1 text-white"
          icon={faStar}
        />
      );
    }
  }
  return <div>{stars}</div>;
}
