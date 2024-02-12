import Navbar from "../components/Navbar";
import TagLineStrip from "../components/TagLineStrip";
import Footer from "../components/Footer";
import BookItem from "../components/BookItem";

export default function BookMenu() {
  return (
    <>
      <div className="py-4 bg-secondary shadow-xl">
        <div className="my-4">
          <Navbar />
        </div>
      </div>
      <TagLineStrip className="shadow-xl" />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4 my-16 container mx-auto px-8">
        <BookItem bookTitle={"fantasy"} />
        <BookItem bookTitle={"romance"} />
        <BookItem bookTitle={"mystery"} />
        <BookItem bookTitle={"fantasy"} />
        <BookItem bookTitle={"romance"} />
        <BookItem bookTitle={"mystery"} />
      </div>
      <Footer />
    </>
  );
}
