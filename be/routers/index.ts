import express from 'express'
import AuthController from '../controllers/AuthController'
import ProductController from '../controllers/ProductController'
import UserController from '../controllers/UserController'
import checkJWT from '../middlewares/checkJwt'

const router = express.Router()
router.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, OPTIONS, PUT, PATCH, DELETE',
  )
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  res.header('Access-Control-Allow-Headers', '*')
  next()
})
router.get('/hi', (req, res) => {
  res.json({ message: 'hi' })
})

router.post('/user/register', UserController.createUser)

router.post('/user/login', AuthController.login)

router.get('/user/current', [checkJWT], UserController.getCurrentUser)

router.get('/user/history', [checkJWT], UserController.getUserHistory)

router.get('/products/all', ProductController.findAllProducts)

router.post('/product/add', [checkJWT], ProductController.addProcuct)

router.post('/product/buy-order', [checkJWT], ProductController.buyProductOrder)

export default router
