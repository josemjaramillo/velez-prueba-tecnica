// import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Product from "./pages/Product"
import Home from "./pages/Home"
import Layout from "./components/Layout"

function App() {

  return (
    <Layout>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<Product />} />
        </Routes>
      </BrowserRouter>
    </Layout>
  )
}

export default App
