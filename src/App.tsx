import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import './App.css'
import Footer from './components/footer'
import Header from './components/header'
// import Notification from './components/notification'
import { fetchCategoriesThunk, fetchProductsThunk } from './slices/products/productsSlice'
import { fetchUsers } from './slices/users/userSlice'
import CheckOut from './pages/CheckOut'
import Home from './pages/Home'
import ProductDetail from './pages/ProductDetail'
import UserList from './pages/UserList'
import { AppDispatch } from './store/store'
import { getUserFromStorage } from './slices/auth/authSlice'
import SignUpFrom from './components/form/signUpForm'

function App() {
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    dispatch(fetchProductsThunk())
    dispatch(fetchUsers())
    dispatch(fetchCategoriesThunk())
    dispatch(getUserFromStorage())
  }, [dispatch])

  return (
    <Router>
      <Header />
      {/* <Notification /> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/products/checkout" element={<CheckOut />} />
        <Route path="/users" element={<UserList />} />
        <Route path="/signup" element={<SignUpFrom />} />
      </Routes>
      <Footer />
    </Router>
  )
}

export default App
