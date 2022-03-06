import Joi from 'joi'
import { getDB } from '*/config/mongodb.js'
const collectionName = 'boards'

const schema = Joi.object({
    title: Joi.string().required().min(5).max(20),
    columnOrder: Joi.array().items(Joi.string()).default([]),
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
        const value = await validateSchema(data)
        const result = await getDB().collection(collectionName).insertOne(value)
        return result.ops[0]
    } catch (error) {
        console.error(error)
    }
}

export const BoardModel = { create }
