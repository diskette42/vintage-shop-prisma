import { Request, Response } from 'express'
import { prisma } from '..'
import bcrypt from 'bcrypt'
import { User } from '@prisma/client'
import * as jwt from 'jsonwebtoken'

const login = async (req: Request, res: Response) => {
  const { username, password } = req.body
  try {
    const findUser: User = await prisma.user.findUnique({
      where: {
        username: username,
      },
    })
    if (!findUser) return res.status(404).json({ message: 'User not found' })

    const isPasswordCorrect = await bcrypt.compare(password, findUser.password)
    if (!isPasswordCorrect)
      return res.status(401).json({ message: 'Incorrect password' })
    const tk = jwt.sign(
      {
        username: findUser.username,
        id: findUser.id,
      },
      process.env.JWT_SECRET as string,
    )
    await prisma.user.update({
      where: {
        id: findUser.id,
      },
      data: {
        jwt: tk,
      },
    })
    res.status(200).json({ tk: tk })
  } catch (e) {
    console.log(e)
  }
}

export default { login }
