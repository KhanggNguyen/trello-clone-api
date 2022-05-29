import Joi from 'joi'
import { HttpStatusCode } from '*/utils/constants.js'

const getAllBoard = async (req, res, next) => {
    try{
        next()
    }catch(error){
        res.status(HttpStatusCode.BAD_REQUEST).json({
            errors: new Error(error).message,
        })
    }
}

const getBoard = async (req, res, next) => {
    try{
        next()
    }catch(error){
        res.status(HttpStatusCode.BAD_REQUEST).json({
            errors: new Error(error).message,
        })
    }
}

const createBoard = async (req, res, next) => {
    const condition = Joi.object({
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

export const BoardValidator = { getAllBoard, createBoard, getBoard}