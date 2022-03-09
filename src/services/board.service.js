import { HttpStatusCode } from '*/utils/constants'
import { BoardModel } from '*/models/board.model'

const createBoard = async (data) => {
    try {
        const result = await BoardModel.create(data)
        return result
    } catch (error) {
        throw new Error(error)
    }
}

const getBoard = async (id) => {
    try {
        const board = await BoardModel.getBoardById(id)

        if(!board || !board.columns)
            throw new Error("No board found.");

        //TODO: sort columns by columnOrder

        board.columns.forEach((column) => {
            column.cards = board.cards.filter(
                (card) => card.columnId.toString() === column._id.toString()
            )
        })

        delete board.cards

        return board
    } catch (error) {
        throw new Error(error)
    }
}

export const BoardService = { createBoard, getBoard }
