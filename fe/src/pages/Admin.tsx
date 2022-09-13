import { Container } from '@mui/material'
import React, { ChangeEvent, useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { addProduct, setAuthHeader } from '../api'
import { getCurrentUser } from '../api/index'
import { ProductInput } from '../utils/product'
import Swal from 'sweetalert2'
import { Toast } from '../utils/Toast'
interface User {
  username: string
  role: number | null
}

function Admin() {
  const navigate = useNavigate()
  const token = localStorage.getItem('token')
  const [newProduct, setNewProduct] = useState<ProductInput>({
    name: '',
    price: 0,
    description: '',
    image: '',
  })
  const [user, setUser] = useState<User>({
    username: '',
    role: null,
  })

  useEffect(() => {
    if ((token && user.role == 0) || (!token && user.role == null)) {
      navigate('/')
      Toast.fire({
        icon: 'error',
        title: 'You are not authorized to access this page',
      })
    }
  }, [token, user])

  useEffect(() => {
    getUserData()
  }, [])

  const getUserData = useCallback(async () => {
    try {
      await setAuthHeader(token as string)
      const res = await getCurrentUser()
      setUser(res.data)
    } catch (e) {
      console.log(e)
    }
  }, [token])

  const onChangeNewProductInput = (e: ChangeEvent<HTMLInputElement>) => {
    setNewProduct({
      ...newProduct,
      [e.target.name]:
        e.target.name === 'price' ? parseInt(e.target.value) : e.target.value,
    })
  }

  const onSubmitNewProduct = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const res = await addProduct(newProduct)
      if (res.status === 201) {
        Swal.fire({
          icon: 'success',
          title: 'Add product Success',
        }).then((response) => {
          if (response.isConfirmed) {
            window.location.reload()
          }
        })
      }
    } catch (e) {
      console.log(e)
    }
  }
  const isNumber = (n: any) => {
    return /^-?[\d.]+(?:e-?\d+)?$/.test(n)
  }

  return (
    <Container maxWidth="sm">
      <form onSubmit={onSubmitNewProduct}>
        <div className="flex flex-col space-y-4 w-full">
          <div className="text-red-500 font-bold">Add Product</div>
          <div className="flex flex-row items-center ">
            <label className="w-[150px] truncate block text-sm font-medium bg-gray-500 p-2.5 h-auto rounded-l-lg">
              Product 's name
            </label>
            <input
              type="text"
              name="name"
              id="helper-text"
              aria-describedby="helper-text-explanation"
              className="flex-1 bg-gray-50 text-gray-900 text-sm rounded-r-lg block p-2.5  dark:bg-gray-700 dark:border-gray-600 "
              placeholder="product 's name"
              onChange={onChangeNewProductInput}
            />
          </div>
          <div className="flex flex-row items-center ">
            <label className="w-[150px] block text-sm font-medium bg-gray-500 p-2.5 h-auto rounded-l-lg">
              price
            </label>
            <input
              type="text"
              name="price"
              id="helper-text"
              aria-describedby="helper-text-explanation"
              className="flex-1 bg-gray-50 text-gray-900 text-sm rounded-r-lg block w-[250px] p-2.5  dark:bg-gray-700 dark:border-gray-600 "
              placeholder="price"
              onChange={onChangeNewProductInput}
            />
          </div>
          <div className="flex flex-row items-center ">
            <label className="w-[150px] block text-sm font-medium bg-gray-500 p-2.5 h-auto rounded-l-lg">
              description
            </label>
            <input
              type="text"
              name="description"
              id="helper-text"
              aria-describedby="helper-text-explanation"
              className="flex-1 bg-gray-50 text-gray-900 text-sm rounded-r-lg block w-[250px] p-2.5  dark:bg-gray-700 dark:border-gray-600 "
              placeholder="description"
              onChange={onChangeNewProductInput}
            />
          </div>
          <div className="flex flex-row items-center ">
            <label className="w-[150px] block text-sm font-medium bg-gray-500 p-2.5 h-auto rounded-l-lg">
              image
            </label>
            <input
              type="text"
              name="image"
              id="helper-text"
              aria-describedby="helper-text-explanation"
              className="flex-1 bg-gray-50 text-gray-900 text-sm rounded-r-lg block w-[250px] p-2.5  dark:bg-gray-700 dark:border-gray-600 "
              placeholder="image"
              onChange={onChangeNewProductInput}
            />
          </div>
          {newProduct.image && (
            <img
              src={newProduct.image}
              alt=""
              className="w-[250px] h-[250px] object-cover"
            />
          )}
          <div className="m-auto">
            <button className="bg-orange-500 px-4 py-2 rounded-3xl">Add</button>
          </div>
        </div>
      </form>
    </Container>
  )
}

export default Admin
