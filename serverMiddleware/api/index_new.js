import express from 'express'
import auth from './auth'
import tasks from './tasks'

const router = express.Router()

// Set up routes
router.use('/auth', auth)
router.use('/tasks', tasks)

export default router