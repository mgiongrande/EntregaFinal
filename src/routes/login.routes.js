import { Router  } from 'express'
import { loginUser, createUserController } from '../controller/login.controller.js'

const router = Router()

router.post('/login', loginUser)

router.post('/create', createUserController)

export default router