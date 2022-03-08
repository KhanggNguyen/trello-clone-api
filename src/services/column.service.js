import { ColumnModel } from '*/models/column.model'
import { BoardModel } from '*/models/board.model'

const createColumn = async (data) => {
    try {
        const newColumn = await ColumnModel.create(data)
        
        await BoardModel.pushColumnOrder(
            newColumn.boardId.toString(),
            newColumn._id.toString()
        )

        return newColumn
    } catch (error) {
        throw new Error(error)
    }
}

const updateColumn = async (id, data) => {
    try {
        const updatedData = {
            ...data,
            updatedAt: Date.now(),
        }
        const result = await ColumnModel.update(id, updatedData)
        return result
    } catch (error) {
        throw new Error(error)
    }
}

export const ColumnService = { createColumn, updateColumn }
