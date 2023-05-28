import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Order from "./pages/Order";
import Checkout from "./pages/Checkout";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="Home" element={<Home />} />
          <Route path="Order" element={<Order />} />
          <Route path="Checkout" element={<Checkout />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
