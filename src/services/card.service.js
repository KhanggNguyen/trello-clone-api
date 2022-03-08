import { CardModel } from '*/models/card.model'
import { ColumnModel } from '*/models/column.model'

const createCard = async (data) => {
    try {
        const newCard = await CardModel.create(data)

        await ColumnModel.pushCardOrder(
            newCard.columnId.toString(),
            newCard._id.toString()
        )

        return newCard
    } catch (error) {
        throw new Error(error)
    }
}

const updateCard = async (id, data) => {
    try {
        const updatedData = {
            ...data,
            updatedAt: Date.now(),
        }
        const result = await CardModel.update(id, updatedData)
        return result
    } catch (error) {
        throw new Error(error)
    }
}

export const CardService = { createCard, updateCard }
