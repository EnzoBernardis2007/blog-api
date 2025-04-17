import Log from "../models/Log.js"

export const createLog = async (req, res) => {
    try {
        const newLog = await Log.create(req.body)
        res.status(201).json(newLog) // 201 means 'Created'
    } catch (err) {
        res.status(500).json({ error: 'error inserting log'})
    }
}

export const getAllLogs = async (req, res) => {
    try {
        const logs = await Log.find().sort({ createdAt: -1 })
        res.status(200).json(logs)
    } catch (err) {
        res.status(500).json({ error: 'error gettings logs' })
    }
}

export const getLogById = async (req, res) => {
    try {
        const log = await Log.findById(req.params.id)
        if (!log) {
            return res.status(404).json({ error: 'Log not found' })
        }
        res.status(200).json(log)
    } catch (err) {
        res.status(500).json({ error: 'Error fetching log' })
    }
}

export const updateLog = async (req, res) => {
    try {
        const updatedLog = await Log.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        )
        if (!updatedLog) {
            return res.status(404).json({ error: 'Log not found' })
        }
        res.status(200).json(updatedLog)
    } catch (err) {
        res.status(500).json({ error: 'Error updating log' })
    }
}

export const deleteLog = async (req, res) => {
    try {
        const deletedLog = await Log.findByIdAndDelete(req.params.id)
        if (!deletedLog) {
            return res.status(404).json({ error: 'Log not found' })
        }
        res.status(200).json({ message: 'Log deleted successfully' })
    } catch (err) {
        res.status(500).json({ error: 'Error deleting log' })
    }
}
