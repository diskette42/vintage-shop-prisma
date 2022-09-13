import { PrismaClient } from '@prisma/client'
import express from 'express'
import router from './routers'
import cors from 'cors'
const prisma = new PrismaClient({
  rejectOnNotFound: {
    findUnique: true,
  },
})
const app = express()
const port = process.env.PORT || 5000
// const corsOptions = {
//   origin: 'http://localhost:3002',
//   credentials: true, //access-control-allow-credentials:true
//   optionSuccessStatus: 200,
// }
async function main() {
  app.use(express.json())

  app.use('/api', router)
  app.use(cors())

  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.log(e)
    await prisma.$disconnect()
    process.exit(1)
  })

export { prisma }
