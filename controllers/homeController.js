import User from "../models/User.js";
import YouTubeLinks from "../models/YouTubeLinks.js";
import Image from "../models/Image.js";
import Text from "../models/Text.js";
import Property from "../models/Property.js";
import Insurance from "../models/Insurance.js";
import { insuranceMailer } from "../mailer/insuranceMailer.js";
import {contactMailer} from '../mailer/contactMailer.js'
import { loanMailer } from "../mailer/loanMailer.js";
import Contact from "../models/Contact.js";
import Loan from "../models/Loan.js";

export const getYtLink = async (req,res)=>{
    console.log('API : /get-yt-link',req.params)
    const {id} = req.params
    try {
        let link = await YouTubeLinks.findOne({ytId : id})

        if(link){
            return res.status(200).json({
                message : 'Link Found',
                data : link
            })
        }else{
            return res.status(400).json({
                message : 'No Link available for this id'
            })
        }
    } catch (error) {
        if(error){
            return res.status(500).json({
                message : 'Internal Server Error'
            })
        }
    }
}
export const getImage = async (req,res)=>{
    console.log('API : /get-image',req.params)
    const {id} = req.params
    try {
        let image = await Image.findOne({imageId : id})

        if(image){
            return res.status(200).json({
                message : 'Image Found',
                data : image
            })
        }else{
            return res.status(400).json({
                message : 'No Image available for this id'
            })
        }
    } catch (error) {
        if(error){
            return res.status(500).json({
                message : 'Internal Server Error'
            })
        }
    }
}
export const getText = async (req,res)=>{
    console.log('API : /get-text',req.params)
    const {id} = req.params
    try {
        let text = await Text.findOne({imageId : id})

        if(text){
            return res.status(200).json({
                message : 'Text Found',
                data : text
            })
        }else{
            return res.status(400).json({
                message : 'No Text available for this id'
            })
        }
    } catch (error) {
        if(error){
            return res.status(500).json({
                message : 'Internal Server Error'
            })
        }
    }
}
export const getProperty = async (req,res)=>{
    console.log('API : /get-property')
    try {
        let prpt = await Property.find({})

        if(prpt){
            return res.status(200).json({
                message : 'Property Details',
                data : prpt
            })
        }else{
            return res.status(400).json({
                message : 'No Property available',
                data : prpt
            })
        }
    } catch (error) {
        if(error){
            return res.status(500).json({
                message : 'Internal Server Error'
            })
        }
    }
}
export const getPropertyById = async (req,res)=>{
    console.log('API : /get-property',req.params)
    const {id} = req.params
    try {
        let prpt = await Property.findOne({prptId : id})

        if(prpt){
            return res.status(200).json({
                message : 'Text Found',
                data : prpt
            })
        }else{
            return res.status(400).json({
                message : 'No Property available for this id'
            })
        }
    } catch (error) {
        if(error){
            return res.status(500).json({
                message : 'Internal Server Error'
            })
        }
    }
}

export const insuranceRequest = async (req,res)=>{
    try {
        console.log('/insurance-request',req.body)
        await Insurance.create(req.body)
        .then(data=>{
            insuranceMailer(data)
            return res.status(200).json({
                message : 'Your Request Is Successfully Accepted. We Will Soon Contact You'
            })
        })
        .catch(err=>{
            console.log('DATABASE ERROR', err)
            return res.status(500).json({
                message : 'Internal Server Error'
            })
        })
        
    }catch (error) {
        return res.status(500).json({
            message : 'Internal Server Error'
        })
    }
}


export const loanRequest = async (req,res)=>{
    try {
        console.log('/loan-request',req.body)
        await Loan.create(req.body)
        .then(data=>{
            loanMailer(data)
            return res.status(200).json({
                message : 'Your Request Is Successfully Accepted. We Will Soon Contact You'
            })
        })

        .catch(err=>{
            console.log('DATABASE ERROR', err)
            return res.status(500).json({
                message : 'Internal Server Error'
            })
        })
        
    }catch (error) {
        console.log("catch error",error)
        return res.status(500).json({
            message : 'Internal Server Error'
        })
    }
}


export const contactRequest = async(req,res)  => {
    try {
        console.log('/contact-request',req.body)
        
        const {email} = req.body

        if(!email){
            return res.status(400).json({
                message : 'Invalid Information REquest'
            })
        }

        let contact = await Contact.findOne({email : req?.body?.email}).lean()

        if(contact){
            console.log('User Contacted Again',contact)
            contactMailer({...contact,resent : true})
            return res.status(200).json({
                message : 'Your request is previously sent. We are trying hard to process it quickly'
            })
        }

        await Contact.create(req.body)
        .then(data=>{
            contactMailer(data)
            return res.status(200).json({
                message : 'Thank You for Contacting Us! We will reach you soon'
            })
        })
        .catch(err=>{
            console.log('DATABASE ERROR', err)
            return res.status(500).json({
                message : 'Internal Server Error'
            })
        })
    } catch (error) {
        console.log('Internal Server Error ',error)
        return res.status(500).json({
            message : 'Internal Server Error'
        })
    }
}
 