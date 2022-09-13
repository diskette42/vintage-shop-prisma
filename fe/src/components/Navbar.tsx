import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useStoreCTX } from '../context/storeContext'

function Navbar() {
  const navigate = useNavigate()
  const { setMyCart } = useStoreCTX()
  const logOut = () => {
    localStorage.setItem('token', '')
    navigate('/login')
    setMyCart([])
  }
  return (
    <>
      <ul className="w-full flex justify-center space-x-4">
        <Link to="/" className="hover:underline">
          profile
        </Link>
        <Link to="/shop" className="hover:underline">
          shop
        </Link>
        <Link to="/admin" className="hover:underline">
          admin
        </Link>
        <Link to="/login" className="hover:underline">
          login
        </Link>
        <Link to="/register" className="hover:underline">
          Register
        </Link>
        <div className="hover:underline cursor-pointer" onClick={logOut}>
          Logout
        </div>
      </ul>
    </>
  )
}

export default Navbar
