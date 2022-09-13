import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Profile from './pages/Profile'
import Login from './pages/Login'
import Navbar from './components/Navbar'
import Shop from './pages/Shop'
import Admin from './pages/Admin'
import OrderConfirmation from './pages/OrderConfirmation'
import Register from './pages/Register'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/order-confirmation" element={<OrderConfirmation />} />
      </Routes>
    </>
  )
}

export default App
