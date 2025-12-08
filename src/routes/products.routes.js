import { Router  } from 'express'
import { deleteProductById, getAllProducts, getProductById, postProduct, updateProductById } from '../controller/products.controller.js'
import { verifyToken } from '../middleware/auth.js'

const router = Router()

router.get('/', getAllProducts)

router.get('/:id', getProductById)

router.post('/new', verifyToken, postProduct) 

router.put('/update', verifyToken, updateProductById)

router.delete('/delete/:id', verifyToken, deleteProductById) 

export default router