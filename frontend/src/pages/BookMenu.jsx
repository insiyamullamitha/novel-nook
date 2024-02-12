import Navbar from "../components/Navbar";
import TagLineStrip from "../components/TagLineStrip";
import Footer from "../components/Footer";
import BookItem from "../components/BookItem";

export default function BookMenu() {
  return (
    <>
      <div className="py-4 bg-secondary shadow-xl">
        <Navbar />
      </div>
      <TagLineStrip className="shadow-xl" />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4 my-16 container mx-auto px-8">
        <BookItem bookGenre={"fantasy"} />
        <BookItem bookGenre={"romance"} />
        <BookItem bookGenre={"mystery"} />
        <BookItem bookGenre={"fantasy"} />
        <BookItem bookGenre={"romance"} />
        <BookItem bookGenre={"mystery"} />
      </div>
      <Footer />
    </>
  );
}
