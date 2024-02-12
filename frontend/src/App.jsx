import "./App.css";
import Home from "./pages/Home";
import BookMenu from "./pages/BookMenu";
import Basket from "./pages/Basket";
import LogIn from "./pages/LogIn";
import SignUp from "./pages/SignUp";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { BasketProvider } from "./components/BasketContext";

function App() {
  return (
    <BasketProvider>
      <div className="App">
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/books" element={<BookMenu />} />
            <Route path="/basket" element={<Basket />} />
            <Route path="/login" element={<LogIn />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        </Router>
      </div>
    </BasketProvider>
  );
}

export default App;
