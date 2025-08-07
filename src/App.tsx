// import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductPage from "./pages/ProductPage";
import Home from "./pages/Home";
import { CartProvider } from "./context/CartProvider";
import Layout from "./components/layout/Layout";


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
