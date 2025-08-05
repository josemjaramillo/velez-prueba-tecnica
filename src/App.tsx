// import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Product from "./pages/Product"
import Home from "./pages/Home"

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<Product />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
