import Navbar from "../components/Navbar";
import TagLineStrip from "../components/TagLineStrip";

export default function Basket() {
  return (
    <>
      <div className="py-4 bg-secondary shadow-xl">
        <Navbar />
      </div>
      <TagLineStrip className="shadow-xl" />
    </>
  );
}
