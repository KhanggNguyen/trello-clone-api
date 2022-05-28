import { HttpStatusCode } from '*/utils/constants'
import { ColumnService } from '*/services/column.service'

const getColumns = async (req, res) => {
    console.log('GET COLUMNS REQUEST')
}

const createColumn = async (req, res) => {
    try {
        console.log('CREATE COLUMN REQUEST')
        const result = await ColumnService.createColumn(req.body)
        console.log(result)
        res.status(HttpStatusCode.CREATED).json(result)
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER).json({
            errors: error.message,
        })
    }
}

const updateColumn = async (req, res) => {
    console.log('UPDATE COLUMN REQUEST')

    try {
        const { id } = req.params

        if (!id) {
            res.status(HttpStatusCode.BAD_REQUEST).json({
                errors: "Column's id is needed.",
            })
        }

        const result = await ColumnService.updateColumn(id, req.body)
        
        res.status(HttpStatusCode.OK).json(result)
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER).json({
            errors: error.message,
        })
    }
}

export const ColumnController = { getColumns, createColumn, updateColumn }
