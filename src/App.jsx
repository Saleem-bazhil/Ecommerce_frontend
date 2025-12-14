import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import Navbar from "./components/components2/Navbar";
import Hero from "./herosection/Hero";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./components/components2/Footer";
import Products from "./productpage/Products";
import ProductDetail from "./productpage/ProductDetail";
import CartPage from "./cart/CartPage";
import CheckOutPage from "./checkoutpage/CheckOutPage";
function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<CartPage/>}/>
          <Route path="/checkout" element={<CheckOutPage/>}/>
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
