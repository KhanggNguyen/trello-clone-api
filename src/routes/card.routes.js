import express from 'express'
const router = express.Router()
import { CardValidator } from '*/validators/Card.validator'
import { CardController } from '*/controllers/Card.controller'
router
    .route('/')
    //.get((req, res) => res.send('Working'))
    .post(CardValidator.createCard, CardController.createCard)

router
    .route('/:id')
    .put(CardValidator.updateCard, CardController.updateCard)

export const CardRoutes = router
