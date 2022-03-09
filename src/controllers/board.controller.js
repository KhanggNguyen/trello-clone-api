import { HttpStatusCode } from '*/utils/constants'
import { BoardService } from '*/services/board.service'

const getBoard = async (req, res) => {
    console.log("GET BOARD REQUEST");
    try {
        const { id } = req.params
        const result = await BoardService.getBoard(id)
        console.log(result)
        res.status(HttpStatusCode.OK).json(result)
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER).json({
            errors: error.message,
        })
    }
}

const createBoard = async (req, res) => {
    try {
        console.log('CREATE BOARD REQUEST')
        const result = await BoardService.createBoard(req.body)
        res.status(HttpStatusCode.CREATED).json(result)
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER).json({
            errors: error.message,
        })
    }
}

export const BoardController = { getBoard, createBoard }
