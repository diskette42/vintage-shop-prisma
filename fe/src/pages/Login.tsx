import React, { useEffect } from 'react'
import Navbar from '../components/Navbar'
import { Button, Container } from '@mui/material'
import { useState } from 'react'
import { PhotoSizeSelectLargeOutlined } from '@mui/icons-material'
import { postLogin } from '../api'
import { useNavigate } from 'react-router-dom'
function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  useEffect(() => {
    if (localStorage.getItem('token')) {
      navigate('/')
    }
  }, [])
  const onChangeUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value)
  }

  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  }

  const onSubmit = async (e: any) => {
    e.preventDefault()
    try {
      const res = await postLogin(username, password)
      const token: string = res.data.tk
      if (!token) return alert('Login failed')
      localStorage.setItem('token', token)
      navigate('/')
    } catch (e) {
      console.log(e)
    }
  }
  return (
    <>
      <Container maxWidth="md">
        <form onSubmit={onSubmit}>
          <div className="flex flex-col space-y-4">
            <div className="text-red-500 font-bold">login</div>
            <div className="flex flex-row items-center justify-center">
              <label className="block text-sm font-medium bg-gray-500 p-2.5 h-auto rounded-l-lg">
                Username
              </label>
              <input
                type="text"
                id="helper-text"
                aria-describedby="helper-text-explanation"
                className="bg-gray-50 text-gray-900 text-sm rounded-r-lg block w-[250px] p-2.5  dark:bg-gray-700 dark:border-gray-600 "
                placeholder="username"
                onChange={onChangeUsername}
              />
            </div>
            <div className="flex flex-row items-center justify-center">
              <label className="block text-sm font-medium bg-gray-500 p-2.5 h-auto rounded-l-lg">
                Password
              </label>
              <input
                type="text"
                id="helper-text"
                aria-describedby="helper-text-explanation"
                className="bg-gray-50 text-gray-900 text-sm rounded-r-lg block w-[250px] p-2.5  dark:bg-gray-700 dark:border-gray-600 "
                placeholder="password"
                onChange={onChangePassword}
              />
            </div>
            <div className="m-auto">
              <button className="bg-orange-500 px-4 py-2 rounded-3xl">
                Login
              </button>
            </div>
          </div>
        </form>
      </Container>
    </>
  )
}

export default Login
