import axios from 'axios'
import { ProductInput, ProductItem } from '../utils/product'

export const api = axios.create({
  baseURL: 'http://localhost:3002/api',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})
export const postRegister = async (username: string, password: string) => {
  return await api.post('/user/register', {
    username,
    password,
  })
}
export const postLogin = async (username: string, password: string) => {
  return await api.post('/user/login', {
    username,
    password,
  })
}

export const setAuthHeader = async (token: string) =>
  await (api.defaults.headers.common['Authorization'] = `Bearer ${token}`)

export const getCurrentUser = async () => await api.get('/user/current')

export const getUserHistory = async () => await api.get('/user/history')

export const getAllProduct = async () => await api.get('/products/all')

export const addProduct = async (payload: ProductInput) =>
  await api.post('/product/add', payload)

export const confirmOder = (payload: ProductItem[]) =>
  api.post('/product/buy-order', { products: payload })
