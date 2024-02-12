import Navbar from "../components/Navbar";
import TagLineStrip from "../components/TagLineStrip";
import { useBasket } from "../components/BasketContext";

export default function Basket() {
  return (
    <>
      <div className="py-4 bg-secondary shadow-xl">
        <div className="my-4">
          <Navbar />
        </div>
      </div>
      <TagLineStrip className="shadow-xl" />
      <div className="container mx-auto px-8 mt-8 grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-4">
        <div>
          <h1 className="text-4xl font-bold">Basket</h1>
          <p className="text-2xl mt-4">Your basket is empty</p>
        </div>
        <div>
          <h1 className="text-4xl font-bold">Total</h1>
          <p className="text-2xl mt-4">£0.00</p>
        </div>
      </div>
    </>
  );
}
