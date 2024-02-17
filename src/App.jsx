import "./App.css";
import Home from "./pages/Home";
import BookMenu from "./pages/BookMenu";
import Basket from "./pages/Basket";
import LogIn from "./pages/LogIn";
import SignUp from "./pages/SignUp";
import MyProfile from "./pages/MyProfile";
import MyOrders from "./pages/MyOrders";
import VerifyEmail from "./pages/VerifyEmail";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { auth } from "./components/FirebaseApp";
import { onAuthStateChanged } from "firebase/auth";

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
      <Routes>
        <Route path="/" element={<Home user={user} />} />
        <Route path="/books" element={<BookMenu user={user} />} />
        <Route path="/basket" element={<Basket user={user} />} />
        <Route
          path="/login"
          element={<LogIn user={user} setUser={setUser} />}
        />
        <Route path="/signup" element={<SignUp user={user} />} />
        <Route path="/myprofile" element={<MyProfile user={user} />} />
        <Route path="/myorders" element={<MyOrders user={user} />} />
        <Route path="/verify-email" element={<VerifyEmail user={user} />} />
        <Route path="*" element={<Home user={user} />} />
      </Routes>
    </Router>
  );
}

export default App;
