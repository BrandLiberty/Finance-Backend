import express from 'express'
const router  = express.Router()

import { createSession } from '../controllers/authController.js'

// Admin Sign In 
router.post('/create-session',createSession)


export default router