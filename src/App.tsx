// import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductPage from "./pages/ProductPage";
import Home from "./pages/Home";
import Layout from "./components/Layout";
import { CartProvider } from "./context/CartProvider";

function App() {
  return (
    <CartProvider>
      <Layout>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductPage />} />
          </Routes>
        </BrowserRouter>
      </Layout>
    </CartProvider>
  );
}

export default App;
