import { User } from '@prisma/client'
import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import { CallTracker } from 'assert'
import { prisma } from '../index'

interface UserInput {
  username: string
  password: string
}

interface currentUserResponse {
  username: string
  role: number
}
const createUser = async (req: Request, res: Response) => {
  const user: UserInput = req.body
  user.password = await bcrypt.hashSync(user.password, 10)
  try {
    const findUserByUsername = await prisma.user.findMany({
      where: {
        username: user.username,
      },
    })
    if (findUserByUsername.length > 0)
      return res.status(409).json({ message: 'Username already exists' })
    const newUser = await prisma.user.create({
      data: {
        username: user.username,
        password: user.password,
      },
    })
    res.status(201).json({
      message: 'User created',
      data: newUser,
    })
  } catch (e) {
    console.log(e)
  }
}

const getCurrentUser = async (req: Request, res: Response) => {
  const { id } = res.locals.jwtPayload
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: parseInt(id),
      },
    })

    const userResponse: currentUserResponse = {
      username: user.username,
      role: user.role,
    }
    res.status(200).json(userResponse)
  } catch (e) {
    console.log(e)
  }
}

const getUserHistory = async (req: Request, res: Response) => {
  const { id } = res.locals.jwtPayload
  try {
    const userHistoryList = await prisma.userHistory.findMany({
      where: {
        userId: parseInt(id),
      },
      select: {
        id: true,
        quantity: true,
        created_at: true,
        product: {
          select: {
            id: true,
            name: true,
            price: true,
            description: true,
          },
        },
      },
    })
    res.status(200).json(userHistoryList)
  } catch (e) {
    console.log(e)
  }
}

export default { createUser, getCurrentUser, getUserHistory }
