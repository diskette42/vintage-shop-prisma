import { Request, Response } from 'express'
import { prisma } from '..'

const findAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await prisma.products.findMany()
    res.status(200).json(products)
  } catch (e) {
    console.log(e)
  }
}

const addProcuct = async (req: Request, res: Response) => {
  const { id } = res.locals.jwtPayload
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: parseInt(id),
      },
    })
    if (user.role != 9) return res.status(401).json({ message: 'Unauthorized' })
    const product = await prisma.products.create({
      data: {
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        image: req.body.image,
      },
    })
    res.status(201).json({
      message: 'Product created',
      product,
    })
  } catch (e) {
    console.log(e)
  }
}

const buyProductOrder = async (req: Request, res: Response) => {
  const { id } = res.locals.jwtPayload
  try {
    // Calculate total price
    let totalPrice = 0
    for (let i = 0; i < req.body.products.length; i++) {
      const product = await prisma.products.findUnique({
        where: {
          id: parseInt(req.body.products[i].id),
        },
      })
      if (!product)
        return res.status(404).json({ message: 'Product not found' })
      totalPrice += product.price * req.body.products[i].quantity
    }
    // Create transaction order
    const transaction = await prisma.transaction.create({
      data: {
        userId: parseInt(id),
        totalPrice: parseFloat(totalPrice.toFixed(2)),
      },
    })
    // Create transaction History
    for (let i = 0; i < req.body.products.length; i++) {
      await prisma.userHistory.create({
        data: {
          userId: parseInt(id),
          transactionId: transaction.id,
          productId: parseInt(req.body.products[i].id),
          quantity: parseInt(req.body.products[i].quantity),
          created_at: transaction.created_at,
        },
      })
    }
    res.status(201).json({
      message: 'Transaction created',
      totalPrice,
    })
  } catch (e) {
    console.log(e)
  }
}

export default { findAllProducts, addProcuct, buyProductOrder }
