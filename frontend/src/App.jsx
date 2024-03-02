import "./App.css";
import Home from "./pages/Home";
import BookMenu from "./pages/BookMenu";
import Basket from "./pages/Basket";
import LogIn from "./pages/LogIn";
import SignUp from "./pages/SignUp";
import MyProfile from "./pages/MyProfile";
import MyOrders from "./pages/MyOrders";
import BookInformation from "./pages/BookInformation";
import VerifyEmail from "./pages/VerifyEmail";
import MyWishlist from "./pages/MyWishlist";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useEffect, useState } from "react";
import { auth } from "./components/FirebaseApp";
import { onAuthStateChanged } from "firebase/auth";
import Contact from "./pages/Contact";
import { Toaster } from "react-hot-toast";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <Router>
      <Toaster />
      <Routes>
        <Route path="/" element={<Home user={user} />} />
        <Route path="/books" element={<BookMenu user={user} />} />
        <Route
          path="/books/:bookTitle"
          element={<BookInformation user={user} />}
        />
        <Route
          path="/basket"
          element={
            user && user.emailVerified ? (
              <Basket user={user} />
            ) : user ? (
              <VerifyEmail user={user} setUser={setUser} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/login"
          element={
            user ? (
              <Navigate to="/myprofile" />
            ) : (
              <LogIn user={user} setUser={setUser} />
            )
          }
        />
        <Route
          path="/signup"
          element={
            user ? (
              <Navigate to="/myprofile" />
            ) : (
              <SignUp user={user} setUser={setUser} />
            )
          }
        />
        <Route
          path="/myprofile"
          element={
            user && user.emailVerified ? (
              <MyProfile user={user} setUser={setUser} />
            ) : user ? (
              <VerifyEmail user={user} setUser={setUser} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/myorders"
          element={
            user && user.emailVerified ? (
              <MyOrders user={user} />
            ) : user ? (
              <VerifyEmail user={user} setUser={setUser} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/mywishlist"
          element={
            user && user.emailVerified ? (
              <MyWishlist user={user} />
            ) : user ? (
              <VerifyEmail user={user} setUser={setUser} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route path="/contact" element={<Contact user={user} />} />
        <Route
          path="*"
          element={user ? <Home user={user} /> : <Navigate to="/login" />}
        />
        "
      </Routes>
    </Router>
  );
}

export default App;
