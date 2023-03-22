import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import './App.css'
import Home from './pages/Home'
import ProductDetail from './pages/ProductDetail'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/productDetail" element={<ProductDetail />} />
      </Routes>
    </Router>
  )
}

export default App
