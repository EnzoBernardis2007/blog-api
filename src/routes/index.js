import express from "express"
import logRoutes from './log.routes.js'

const router = express.Router()

router.use('/logs', logRoutes)

export default router