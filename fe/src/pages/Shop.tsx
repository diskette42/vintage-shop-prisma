import { AddShoppingCart } from '@mui/icons-material'
import React, { useState, useEffect, useMemo } from 'react'
import { getAllProduct } from '../api/index'
import { useStoreCTX } from '../context/storeContext'
import { ProductList, ProductInput, ProductItem } from '../utils/product'

function Shop() {
  const [products, setProducts] = useState<ProductList[]>([])
  const { addProductToCart } = useStoreCTX()
  const productOnStock = useMemo(() => {
    return products.filter((product) => product.isOnStock)
  }, [products])

  useEffect(() => {
    getProducts()
  }, [])

  const getProducts = async () => {
    try {
      const res = await getAllProduct()
      setProducts(res.data)
    } catch (e) {
      console.log(e)
    }
  }
  const addToCart = (product: ProductList) => {
    const { id, name, description, image, price } = product
    const productConfirm: ProductItem = {
      id,
      description,
      quantity: 1,
      name,
      image,
      price,
    }
    addProductToCart(productConfirm)
  }
  return (
    <>
      <div className="flex flex-wrap mt-10 w-full">
        {productOnStock.map((product: ProductList, index: number) => (
          <div className="w-1/4 p-2" key={index}>
            <div className="rounded-lg border-2 p-2">
              <img src={product.image} className="h-[250px] w-full" />
              <div className="text-xl font-bold">{product.name}</div>
              <div className="text-xs text-gray-700">{product.description}</div>
              <div className="flex justify-between mt-2 items-center">
                <div className="text-xs text-gray-700 font-bold">Price</div>
                <div className="flex items-center space-x-1">
                  <div className="text-xs text-gray-700 font-bold">
                    {product.price}
                  </div>
                  <div>
                    <AddShoppingCart
                      className="cursor-pointer"
                      onClick={() => addToCart(product)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default Shop
