import Log from "../models/Log.js"

export const createLog = async (req, res) => {
    try {
        const newLog = await Log.create(req.body)
        res.status(201).json(newLog) // 201 means 'Created'
    } catch (err) {
        res.status(500).json({ error: 'error inserting log'})
    }
}