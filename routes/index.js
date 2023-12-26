import express from 'express'
import passport from "passport";

const router  = express.Router()

import { createSession , imageUpdate, ytUpdate , textUpdate} from '../controllers/authController.js'
import { getYtLink , getImage, getText} from '../controllers/homeController.js';

// Admin Sign In 
router.post('/create-session',createSession)

// YOU TUbe Links 
router.get('/get-yt-link/:id',getYtLink)
router.post('/update-yt-link',passport.authenticate('jwt',{session : false}),ytUpdate)

// Image Links 
router.get('/get-image/:id',getImage)
router.post('/update-image',passport.authenticate('jwt',{session : false}),imageUpdate)

// Text Links 
router.get('/get-text/:id',getText)
router.post('/update-text',passport.authenticate('jwt',{session : false}),textUpdate)


export default router