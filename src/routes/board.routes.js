import express from 'express'
const router = express.Router()
import { BoardValidator } from '*/validators/board.validator'
import { BoardController } from '*/controllers/board.controller'

router.route('/').post(BoardValidator.createBoard, BoardController.createBoard)

router.route('/').get(BoardValidator.getAllBoard, BoardController.getAllBoard)

router.route('/:id').get(BoardValidator.getBoard, BoardController.getBoard)

export const BoardRoutes = router
