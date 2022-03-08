import express from 'express'
import { HttpStatusCode } from '*/utils/constants'
import { BoardRoutes } from './board.routes'
import { ColumnRoutes } from './column.routes'
import { CardRoutes } from './card.routes'

const router = express.Router()

router.use('/board', BoardRoutes)
router.use('/column', ColumnRoutes)
router.use('/card', CardRoutes)

export default router
