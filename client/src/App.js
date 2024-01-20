import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import "bootstrap/dist/css/bootstrap.min.css";
import Cart from "./pages/cart/Cart";
import Transaction from "./pages/transaction/Transaction";
import NotFound from "./pages/notfound/NotFound";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        {/* <Route path="/plans" element={<Plans />} /> */}
        <Route path="/success" element={<Transaction />} />
        <Route path="/cancel" element={<Transaction />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
