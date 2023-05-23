import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import './App.css'
import Footer from './components/footer'
import Header from './components/header'
// import Notification from './components/notification'
import { fetchCategoriesThunk, fetchProductsThunk } from './slices/productsSlice'
import CheckOut from './pages/CheckOut'
import Home from './pages/Home'
import ProductDetail from './pages/ProductDetail'
import UserList from './pages/UserList'
import { AppDispatch } from './store/store'
import { getUserFromStorage } from './slices/authSlice'
import SignUpForm from './components/form/SignUpForm'
import OrderConfirmation from './pages/OrderConfirmation'
import SignInForm from './components/form/SignInForm'

function App() {
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    dispatch(fetchProductsThunk())
    dispatch(fetchCategoriesThunk())
    dispatch(getUserFromStorage())
  }, [dispatch])

  return (
    <Router>
      <div className="container">
        <Header />
        {/* <Notification /> */}
        <div className="body">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/orders/checkout" element={<CheckOut />} />
            <Route path="/orders/confirmation" element={<OrderConfirmation />} />
            <Route path="/users" element={<UserList />} />
            <Route path="/signup" element={<SignUpForm />} />
            <Route path="/signin" element={<SignInForm />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  )
}

export default App
