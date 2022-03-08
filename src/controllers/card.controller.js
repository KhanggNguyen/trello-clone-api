import { HttpStatusCode } from '*/utils/constants'
import { CardService } from '*/services/Card.service'

const getCards = async (req, res) => {
    console.log('GET CARDS REQUEST')
}

const createCard = async (req, res) => {
    try {
        console.log('CREATE CARD REQUEST')
        const result = await CardService.createCard(req.body)
        res.status(HttpStatusCode.CREATED).json(result)
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER).json({
            errors: error.message,
        })
    }
}

const updateCard = async (req, res) => {
    console.log('UPDATE COLUMN REQUEST')

    try {
        const { id } = req.params

        if (!id) {
            res.status(HttpStatusCode.BAD_REQUEST).json({
                errors: "Card's id is needed.",
            })
        }

        const result = await CardService.updateCard(id, req.body)
        console.log(result)
        res.status(HttpStatusCode.OK).json(result)
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER).json({
            errors: error.message,
        })
    }
}

export const CardController = { getCards, createCard, updateCard }
