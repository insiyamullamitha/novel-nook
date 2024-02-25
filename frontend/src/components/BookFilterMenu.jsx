export default function BookFilterMenu() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <h2 className="uppercase text-2xl">Filter by</h2>
        <div className="flex flex-col gap-2">
          <label htmlFor="genre">Genre</label>
          <select
            name="genre"
            id="genre"
            className="border-2 border-black rounded-lg p-2"
          >
            <option value="all">All</option>
            <option value="fiction">Fiction</option>
            <option value="non-fiction">Non-Fiction</option>
            <option value="fantasy">Fantasy</option>
            <option value="mystery">Mystery</option>
            <option value="thriller">Thriller</option>
          </select>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="author">Author</label>
          <select
            name="author"
            id="author"
            className="border-2 border-black rounded-lg p-2"
          >
            <option value="all">All</option>
            <option value="j.k. rowling">J.K. Rowling</option>
            <option value="stephen king">Stephen King</option>
            <option value="agatha christie">Agatha Christie</option>
            <option value="dan brown">Dan Brown</option>
            <option value="j.r.r. tolkien">J.R.R. Tolkien</option>
          </select>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="price">Price</label>
          <select
            name="price"
            id="price"
            className="border-2 border-black rounded-lg p-2"
          >
            <option value="all">All</option>
            <option value="0-10">£0 - £10</option>
            <option value="10-20">£10 - £20</option>
            <option value="20-30">£20 - £30</option>
            <option value="30-40">£30 - £40</option>
            <option value="40-50">£40 - £50</option>
          </select>
        </div>
      </div>
      <button className="bg-black text-white uppercase text-sm font-semibold rounded-full px-6 py-2 justify-center items-center m-auto tracking-wide">
        Apply Filters
      </button>
    </div>
  );
}
