import React, { useCallback, useEffect } from 'react'
import Navbar from '../components/Navbar'
import { getCurrentUser, getUserHistory, setAuthHeader } from '../api/index'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import moment from 'moment'
import { Container } from '@mui/material'
interface historyItem {
  quantity: number
  created_at: string
  product: {
    name: string
    price: number
  }
}
interface User {
  username: string
  role: number
}

function Profile() {
  const token = localStorage.getItem('token')
  const navigate = useNavigate()
  const [historyList, setHistoryList] = useState([])
  const [user, setUser] = useState<User>({
    username: '',
    role: 0,
  })
  useEffect(() => {
    if (token) {
      getUserHistoryList()
    } else {
      navigate('/login')
    }
  }, [token])
  const getUserHistoryList = useCallback(async () => {
    try {
      await setAuthHeader(token as string)
      const res = await getUserHistory()
      const { data: user } = await getCurrentUser()
      setUser(user)
      setHistoryList(res.data)
    } catch (e) {
      console.log(e)
      localStorage.setItem('token', '')
      navigate('/login')
    }
  }, [token])
  return (
    <>
      <Container maxWidth="sm">
        <div className="flex justify-between w-full my-10">
          <div>username: {user.username}</div>
          <div>role: {user.role}</div>
        </div>
        <div className="flex justify-center w-full ">
          <div className="overflow-x-auto relative rounded-lg">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 ">
              <thead className="text-xs uppercase bg-gray-700 text-gray-400 rounded-lg">
                <tr>
                  <th scope="col" className="py-3 px-6">
                    id
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Name
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Amount
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Price
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Purchased date
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Purchased time
                  </th>
                </tr>
              </thead>
              <tbody>
                {historyList.map((item: historyItem, index) => (
                  <tr
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                    key={index}
                  >
                    <td className="py-4 px-6">{index + 1}</td>
                    <td
                      scope="row"
                      className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {item.product.name}
                    </td>
                    <td className="py-4 px-6">{item.quantity}</td>
                    <td className="py-4 px-6">
                      {item.product.price * item.quantity}
                    </td>
                    <td className="py-4 px-6">
                      {moment(item.created_at).format('L')}
                    </td>
                    <td className="py-4 px-6">
                      {moment(item.created_at).format('LT')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Container>
    </>
  )
}

export default Profile
