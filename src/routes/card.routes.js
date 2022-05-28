import express from 'express'
const router = express.Router()
import { CardValidator } from '*/validators/card.validator'
import { CardController } from '*/controllers/card.controller'
router
    .route('/')
    //.get((req, res) => res.send('Working'))
    .post(CardValidator.createCard, CardController.createCard)

router
    .route('/:id')
    .put(CardValidator.updateCard, CardController.updateCard)

export const CardRoutes = router
