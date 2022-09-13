import { Delete, TryTwoTone } from '@mui/icons-material'
import { Container } from '@mui/material'
import React, { useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { confirmOder, setAuthHeader, getCurrentUser } from '../api'
import { useStoreCTX } from '../context/storeContext'
import { useEffect } from 'react'
import { Toast } from '../utils/Toast'

function OrderConfirmation() {
  const {
    myCart,
    removeProductFromCart,
    myCartPrice,
    setMyCart,
    itemInBasket,
  } = useStoreCTX()
  const [user, setUser] = useState([])
  const navigate = useNavigate()
  const token = localStorage.getItem('token')
  useEffect(() => {
    if (!token) {
      navigate('/login')
      Toast.fire({
        icon: 'error',
        title: 'Please Login',
      })
    }
    currentUser()
  }, [token])

  const currentUser = useCallback(async () => {
    try {
      await setAuthHeader(token as string)
      const res = await getCurrentUser()
      setUser(res.data)
    } catch (e) {
      console.log(e)
    }
  }, [token])

  const confirmTransaction = async () => {
    try {
      const res = await confirmOder(myCart)
      if (res.status == 201) {
        Swal.fire({
          icon: 'success',
          title: 'Order confirmed',
        }).then((res) => {
          if (res.isConfirmed) {
            setMyCart([])
            navigate('/')
          }
        })
      }
    } catch (e) {
      console.log(e)
    }
  }
  return (
    <>
      <Container maxWidth="sm" className="mt-10">
        {myCart.map((item, index) => (
          <div className="bg-green-500 p-2 flex rounded-lg mb-2">
            <div className="flex-1 flex space-x-2">
              <div>{item.name}</div>
              <div>x{item.quantity}</div>
            </div>
            <div></div>
            <div>{item.quantity * item.price}</div>
            <Delete
              className="cursor-pointer"
              onClick={() => removeProductFromCart(index)}
            />
          </div>
        ))}
        <div className="bg-purple-500 p-2 rounded-lg">
          <div className="flex justify-between">
            <div>Total Price</div>
            <div>{myCartPrice}</div>
          </div>
          <div className="flex justify-between">
            <div>Item</div>
            <div>{itemInBasket}</div>
          </div>
        </div>
        <div className="flex justify-center mt-2 ">
          <button
            onClick={confirmTransaction}
            className="px-4 py-2 bg-yellow-500 rounded-lg"
          >
            Confirm Transaction
          </button>
        </div>
      </Container>
    </>
  )
}

export default OrderConfirmation
