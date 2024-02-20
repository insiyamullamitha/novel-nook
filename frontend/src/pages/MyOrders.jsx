import Navbar from "../components/Navbar";
import TagLineStrip from "../components/TagLineStrip";
import Order from "../components/Order";
import Footer from "../components/Footer";
import { getOrders } from "../components/FirebaseApp";
import { useState, useEffect } from "react";

export default function MyOrders({ user }) {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const fetchedOrders = await getOrders(user.email);
        setOrders(fetchedOrders);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, [user.email, setOrders]);

  return (
    <>
      <div className="py-4 bg-secondary shadow-xl">
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
          <div className="mb-16">
            {orders.length === 0 ? (
              <p className="text-xl tagline-font mt-4">
                You have no orders yet.
              </p>
            ) : (
              orders.map((order, index) => (
                <div key={index}>
                  <Order
                    date={order.date}
                    price={order.price}
                    books={order.items}
                    totalquantity={order.totalquantity}
                  />
                </div>
              ))
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
