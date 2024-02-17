import Navbar from "../components/Navbar";
import TagLineStrip from "../components/TagLineStrip";
import Order from "../components/Order";
import Footer from "../components/Footer";

export default function MyOrders({ user }) {
  return (
    <>
      <div className=" py-4 bg-secondary shadow-xl">
        <div className="my-4">
          <Navbar user={user} />
        </div>
      </div>
      <TagLineStrip className="shadow-xl" />
      <div className="tagline-font container mx-auto text-black px-8 mt-8">
        <div>
          <h1 className="text-4xl uppercase tagline-font font-bold text-secondary">
            My Orders
          </h1>
          <Order
            date={"13/02/2024"}
            price={"£30.96"}
            items={"Better Than The Movies"}
          />
        </div>
      </div>
      <Footer />
    </>
  );
}
