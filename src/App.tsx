// import { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ProductPage from "./pages/ProductPage";
import { CartProvider } from "./context/CartProvider";
import Layout from "./components/layout/Layout";


function App() {
  return (
    <CartProvider>
      <Layout>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/product/125829257" replace />} />
            <Route path="/product/:id" element={<ProductPage />} />
          </Routes>
        </BrowserRouter>
      </Layout>
    </CartProvider>
  );
}

export default App;
