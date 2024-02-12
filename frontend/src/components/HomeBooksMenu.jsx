import BookItem from "./BookItem";

export default function HomeBooksMenu() {
  return (
    <section className="mt-16">
      <div className="grid grid-cols-3 gap-4 mt-8 container mx-auto px-8">
        <BookItem bookGenre={"fantasy"} />
        <BookItem bookGenre={"romance"} />
        <BookItem bookGenre={"mystery"} />
      </div>
    </section>
  );
}
