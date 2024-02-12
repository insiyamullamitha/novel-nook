import HomeBookItem from "./HomeBookItem";

export default function HomeBooksMenu() {
  return (
    <section className="mt-16">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4 mt-8 container mx-auto px-8">
        <HomeBookItem bookGenre={"fantasy"} />
        <HomeBookItem bookGenre={"romance"} />
        <HomeBookItem bookGenre={"mystery"} />
      </div>
    </section>
  );
}
