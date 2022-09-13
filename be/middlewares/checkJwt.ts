import { NextFunction, Request, Response } from 'express'
import * as jwt from 'jsonwebtoken'
import { prisma } from '..'

const checkJWT = async (req: Request, res: Response, next: NextFunction) => {
  let token = <string>req.headers['authorization']

  if (!token) {
    return res.status(401).json({ message: 'No token provided' })
  }

  let jwtPayload
  token = token.split(' ')[1]
  try {
    jwtPayload = <any>jwt.verify(token, process.env.JWT_SECRET as string)
    res.locals.jwtPayload = jwtPayload
  } catch (error) {
    res.status(401).send()
    return
  }

  try {
    const user = await prisma.user.findUniqueOrThrow({
      where: {
        id: jwtPayload.id,
      },
    })
    if (user.jwt != token) {
      throw new Error('token not valid')
    }
  } catch (e) {
    res.status(444).send('Please re-login')
    console.log(e)
  }
  next()
}

export default checkJWT
