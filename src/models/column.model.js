import Joi from 'joi'
import { ObjectID } from 'mongodb'
import { getDB } from '*/config/mongodb.js'

const collectionName = 'columns'

const schema = Joi.object({
    boardId: Joi.string().required(),
    title: Joi.string().required().min(5).max(20).trim(),
    cardOrder: Joi.array().items(Joi.string()).default([]),
    createdAt: Joi.date().timestamp().default(Date.now()),
    updatedAt: Joi.date().timestamp().default(null),
    _destroy: Joi.boolean().default(false),
})

const validateSchema = async (data) => {
    //abortEarly : false return all schema validator errors
    return await schema.validateAsync(data, { abortEarly: false })
}

const create = async (data) => {
    try {
        const validatedValue = await validateSchema(data)
        const insertValue = {
            ...validatedValue,
            boardId: ObjectID(validatedValue.boardId),
        }
        const result = await getDB()
            .collection(collectionName)
            .insertOne(insertValue)

        console.log(result)

        const newColumn = await getDB()
            .collection(collectionName)
            .findOne({ _id: result.insertedId })

        return newColumn
    } catch (error) {
        throw new Error(error)
    }
}

const update = async (id, data) => {
    try {
        const result = await getDB()
            .collection(collectionName)
            .findOneAndUpdate(
                { _id: ObjectID(id) },
                { $set: data },
                { returnOriginal: false }
            )
        return result.value
    } catch (error) {
        throw new Error(error)
    }
}

const pushCardOrder = async (columnId, cardId) => {
    try {
        const result = await getDB()
            .collection(collectionName)
            .findOneAndUpdate(
                { _id: ObjectID(columnId) },
                {
                    $push: {
                        cardOrder: cardId,
                    },
                },
                { returnOriginal: false }
            )

        return result.value
    } catch (error) {
        throw new Error(error)
    }
}

export const ColumnModel = { create, update, pushCardOrder, collectionName }
