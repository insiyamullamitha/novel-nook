const Order = ({ date, price, books, totalquantity }) => {
  const formatTitle = (title) => title.replace(/_/g, " ");

  return (
    <div className="container mx-auto my-6 bg-white p-6 rounded-lg shadow-xl">
      <h1 className="text-2xl font-bold text-accent1 mb-2">{date}</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {books.map((book, index) => (
          <div key={index} className="border bg-gray-100 p-4 rounded-md">
            <p className="text-m capitalize font-semibold">
              {formatTitle(book.title)}
            </p>
            <p className="text-xs text-gray-500">Quantity: {book.quantity}</p>
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center mt-2">
        <div className="flex items-center gap-2">
          <p className="text-gray-500">Total Quantity:</p>
          <p className="text-lg font-semibold">{totalquantity}</p>
        </div>

        <div className="flex items-center gap-2">
          <p className="text-gray-500">Total Price:</p>
          <p className="text-lg font-semibold">£{price}</p>
        </div>
      </div>
    </div>
  );
};

export default Order;
