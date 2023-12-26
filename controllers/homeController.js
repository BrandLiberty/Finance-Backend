import User from "../models/User.js";
import { contactMailer} from "../mailer/contactMailer.js";
import YouTubeLinks from "../models/YouTubeLinks.js";
import Image from "../models/Images.js";
import Text from "../models/Text.js";

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