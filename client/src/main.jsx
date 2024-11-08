import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Home from '../src/pages/Home'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/App" element={<App />} />
  </Routes>
  </BrowserRouter>,
)
