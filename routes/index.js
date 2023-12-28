import express from 'express'
import passport from "passport";

const router  = express.Router()

import { createSession , imageUpdate, ytUpdate , textUpdate, propertyUpdate, deleteProperty} from '../controllers/authController.js'
import { getYtLink , getImage, getText, getProperty, getPropertyById} from '../controllers/homeController.js';

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

// Property Links 
router.get('/get-property',getProperty)
router.get('/get-property/:id',getPropertyById)
router.post('/update-property',passport.authenticate('jwt',{session : false}),propertyUpdate)
router.post('/delete-property/:id',passport.authenticate('jwt',{session : false}),deleteProperty)


export default router