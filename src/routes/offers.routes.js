import { Router  } from 'express'
import { getAllOffers, getOfferById, postOffer, putOffer, deleteOfferById } from '../controller/offers.controller.js'
import { verifyToken } from '../middleware/auth.js'


const router = Router()

router.get('/', getAllOffers)

router.get('/:id', getOfferById)

router.post('/new', verifyToken, postOffer) 

router.put('/update', verifyToken, putOffer)

router.delete('/delete/:id', verifyToken, deleteOfferById) 

export default router