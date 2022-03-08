import Joi from 'joi'
import { HttpStatusCode } from '*/utils/constants.js'

const createCard = async (req, res, next) => {
    const condition = Joi.object({
        boardId: Joi.string().required(),
        columnId: Joi.string().required(),
        title: Joi.string().required().min(5).max(20).trim(),
    })

    try {
        await condition.validateAsync(req.body, { abortEarly: false })
        next()
    } catch (error) {
        res.status(HttpStatusCode.BAD_REQUEST).json({
            errors: new Error(error).message,
        })
    }
}

const updateCard = async (req, res, next) => {
    const condition = Joi.object({
        title: Joi.string().min(5).max(20).trim(),
    })

    try {
        await condition.validateAsync(req.body, {
            abortEarly: false,
            allowUnknown: true, //allow unknown property to be updated
        })
        next()
    } catch (error) {
        res.status(HttpStatusCode.BAD_REQUEST).json({
            errors: new Error(error).message,
        })
    }
}

export const CardValidator = { createCard, updateCard }
