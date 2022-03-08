import Joi from 'joi'
import { ObjectID } from 'mongodb'
import { getDB } from '*/config/mongodb.js'
import { ColumnModel } from '*/models/column.model'
import { CardModel } from './card.model'
const collectionName = 'boards'

const schema = Joi.object({
    title: Joi.string().required().min(5).max(20).trim(),
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

        const newBoard = await getDB()
        .collection(collectionName)
        .findOne({_id: result.insertedId})
        
        return newBoard
    } catch (error) {
        throw new Error(error)
    }
}

const getBoardById = async (id) => {
    try {
        const result = await getDB()
            .collection(collectionName)
            .aggregate([
                {
                    $match: {
                        _id: ObjectID(id),
                    },
                },
                // {
                //     $addFields: {
                //         _id: { $toString: '$_id'}
                //     }
                // },
                {
                    $lookup: {
                        from: ColumnModel.collectionName,
                        localField: '_id',
                        foreignField: 'boardId',
                        as: 'columns',
                    },
                },
                {
                    $lookup: {
                        from: CardModel.collectionName,
                        localField: '_id',
                        foreignField: 'boardId',
                        as: 'cards',
                    },
                },
            ])
            .toArray()
        return result[0] || {}
    } catch (error) {
        throw new Error(error)
    }
}

const pushColumnOrder = async (boardId, columnId) => {
    try {
        const result = await getDB()
            .collection(collectionName)
            .findOneAndUpdate(
                { _id: ObjectID(boardId) },
                {
                    $push: {
                        columnOrder: columnId,
                    },
                },
                { returnOriginal: false }
            )

        return result.value
    } catch (error) {
        throw new Error(error)
    }
}

export const BoardModel = { create, getBoardById, pushColumnOrder }
