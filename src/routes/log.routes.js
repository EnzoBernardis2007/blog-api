import express from "express"
import { createLog } from "../controllers/log.controller.js"

const router = express.Router()

router.post('/', createLog)

export default router