import "./App.css";
import Home from "./pages/Home";
import BookMenu from "./pages/BookMenu";
import Basket from "./pages/Basket";
import LogIn from "./pages/LogIn";
import SignUp from "./pages/SignUp";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
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
  );
}

export default App;
