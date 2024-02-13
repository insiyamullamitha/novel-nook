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
        <BookItem bookTitle={"daisy_haites"} />
        <BookItem bookTitle={"powerless"} />
        <BookItem bookTitle={"better_than_the_movies"} />
        <BookItem bookTitle={"caraval"} />
        <BookItem bookTitle={"a_court_of_thorns_and_roses"} />
        <BookItem bookTitle={"the_american_roommate_experience"} />
        <BookItem bookTitle={"how_to_kill_your_family"} />
      </div>
      <Footer />
    </>
  );
}
