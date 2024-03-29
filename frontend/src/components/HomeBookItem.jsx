import { Link } from "react-router-dom";
import Right from "../icons/Right";

export default function HomeBookItem({ bookGenre }) {
  return (
    <div className="bg-transparent text-black border-2 border-black p-4 rounded-lg text-center hover:bg-darkerprimary hover:shadow-md hover:shadow-black/25 over:bg-white transition-all">
      <div className="text-center">
        <p className="tagline-font uppercase text-4xl">{bookGenre}</p>
        <img
          className="max-h-auto max-h-40 block mx-auto mt-4"
          src={"/" + bookGenre + ".png"}
          alt="book"
        />
      </div>
      <Link to="/books">
        <button
          className="bg-black my-6 flex gap-2 text-white uppercase text-sm font-semibold rounded-full px-6 py-2 justify-center items-center m-auto tracking-wide"
          style={{ whiteSpace: "nowrap", overflow: "hidden" }}
        >
          Shop Now
          <Right />
        </button>
      </Link>
    </div>
  );
}
