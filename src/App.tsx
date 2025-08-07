// import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import ProductPage from "./pages/ProductPage"
import Home from "./pages/Home"
import Layout from "./components/Layout"

function App() {

  return (
    <Layout>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductPage />} />
        </Routes>
      </BrowserRouter>
    </Layout>
  )
}

export default App
