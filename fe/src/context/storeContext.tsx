import { AddShoppingCart } from '@mui/icons-material'
import { createContext, useContext, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { addProduct } from '../api/index'
import { ProductItem } from '../utils/product'

interface ProductConfirmOrder {
  productId: number
  quantity: number
}

interface CartContextType {
  myCart: ProductItem[]
  setMyCart: React.Dispatch<React.SetStateAction<ProductItem[]>>
  itemInBasket: number
  myCartPrice: number
  addProductToCart: (product: ProductItem) => void
  removeProductFromCart: (index: number) => void
}
const storeContext = createContext<CartContextType>({
  myCart: [],
  setMyCart: () => {},
  addProductToCart: () => {},
  removeProductFromCart: () => {},
  itemInBasket: 0,
  myCartPrice: 0,
})

export const StoreContextProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [myCart, setMyCart] = useState<ProductItem[]>([])
  const addProductToCart = (product: ProductItem) => {
    for (let i = 0; i < myCart.length; i++) {
      if (myCart[i].id === product.id) {
        myCart[i].quantity += product.quantity
        setMyCart([...myCart])
        return
      }
    }
    setMyCart([...myCart, product])
  }

  const removeProductFromCart = (index: number) => {
    myCart.splice(index, 1)
    setMyCart([...myCart])
  }
  const myCartPrice = useMemo(
    () => myCart.reduce((acc, item) => acc + item.price * item.quantity, 0),
    [myCart],
  )

  const itemInBasket = useMemo(() => {
    return myCart.reduce((acc, item) => acc + item.quantity, 0)
  }, [myCart])

  const value: CartContextType = {
    myCart,
    setMyCart,
    myCartPrice,
    itemInBasket,
    addProductToCart,
    removeProductFromCart,
  }

  return (
    <storeContext.Provider value={value}>
      <div className="relative min-h-screen">
        {children}
        {myCart.length > 0 && (
          <Link to="/order-confirmation">
            <div className="absolute bottom-10 right-10 bg-green-500 px-4 py-2 rounded-lg flex flex-col items-center ">
              <AddShoppingCart />
              <div>{itemInBasket}</div>
            </div>
          </Link>
        )}
      </div>
    </storeContext.Provider>
  )
}

export const useStoreCTX = () => useContext(storeContext)
