import express from 'express'
const router = express.Router()
import { ColumnValidator } from '*/validators/column.validator'
import { ColumnController } from '*/controllers/column.controller'

router
    .route('/')
    //.get((req, res) => res.send('Working'))
    .post(ColumnValidator.createColumn, ColumnController.createColumn)

router.route('/:id').put(ColumnValidator.updateColumn, ColumnController.updateColumn)

export const ColumnRoutes = router
