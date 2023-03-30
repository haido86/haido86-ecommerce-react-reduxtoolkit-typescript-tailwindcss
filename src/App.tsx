import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import './App.css'
import Footer from './components/footer'
import Header from './components/header'
// import Notification from './components/notification'
import { fetchProductsThunk } from './features/products/productsSlice'
import { fetchUsers } from './features/user/userSlice'
import Home from './pages/Home'
import ProductDetail from './pages/ProductDetail'
import UserList from './pages/UserList'
import { AppDispatch } from './store'

function App() {
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    dispatch(fetchProductsThunk())
    dispatch(fetchUsers())
  }, [dispatch])

  return (
    <Router>
      <Header />
      {/* <Notification /> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/users" element={<UserList />} />
      </Routes>
      <Footer />
    </Router>
  )
}

export default App
