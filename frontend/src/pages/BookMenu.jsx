import Navbar from "../components/Navbar";
import TagLineStrip from "../components/TagLineStrip";
import Footer from "../components/Footer";
import BookItem from "../components/BookItem";
import { useState } from "react";

export default function BookMenu() {
  const [basketCount, setBasketCount] = useState(
    parseInt(localStorage.getItem("basketCount")) || 0
  );

  const updateBasketCount = (newCount) => {
    const updatedCount = basketCount + newCount;
    setBasketCount(updatedCount);
    localStorage.setItem("basketCount", updatedCount.toString());
  };

  return (
    <>
      <div className="py-4 bg-secondary shadow-xl">
        <Navbar basketCount={basketCount} />
      </div>
      <TagLineStrip className="shadow-xl" />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4 my-16 container mx-auto px-8">
        <BookItem bookGenre={"fantasy"} updateBasketCount={updateBasketCount} />
        <BookItem bookGenre={"romance"} updateBasketCount={updateBasketCount} />
        <BookItem bookGenre={"mystery"} updateBasketCount={updateBasketCount} />
        <BookItem bookGenre={"fantasy"} updateBasketCount={updateBasketCount} />
        <BookItem bookGenre={"romance"} updateBasketCount={updateBasketCount} />
        <BookItem bookGenre={"mystery"} updateBasketCount={updateBasketCount} />
      </div>
      <Footer />
    </>
  );
}
