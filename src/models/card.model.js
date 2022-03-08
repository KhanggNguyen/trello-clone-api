import Joi from 'joi'
import { ObjectID } from 'mongodb'
import { getDB } from '*/config/mongodb.js'

const collectionName = 'cards'

const schema = Joi.object({
    boardId: Joi.string().required(),
    columnId: Joi.string().required(),
    title: Joi.string().required().min(5).max(20).trim(),
    cover: Joi.string().default(null),
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
            columnId: ObjectID(validatedValue.columnId),
        }
        const result = await getDB()
            .collection(collectionName)
            .insertOne(insertValue)

        const newCard = await getDB()
            .collection(collectionName)
            .findOne({ _id: result.insertedId })

        return newCard
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
        return result
    } catch (error) {
        throw new Error(error)
    }
}

export const CardModel = { create, update, collectionName }
