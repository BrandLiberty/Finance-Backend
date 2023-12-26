import User from "../models/User.js";
import YouTubeLinks from "../models/YouTubeLinks.js";
import Image from "../models/Images.js";
import jwt from 'jsonwebtoken'
import Text from "../models/Text.js";

export const createSession = async function (req, res) {
    try {
        console.log('API : /create-session', req?.body)
        const { id, password } = req.body
        let user = {
            id: id,
            password: password
        }
        // trial 
        if (id === '123456' && password === '123456') {
            return res.status(200).json({
                message: `Welcome Admin`,
                data: {
                    token: jwt.sign(user, 'finance', { expiresIn: `${1000 * 60 * 60 * 24 * 7 * 4}` })
                }
            })
        } else {
            return res.status(400).json({
                message: 'Invalid email or password'
            });
        }
        // trial end 


        user = await User.findOne({ email: req.body.email });
        console.log('CHecking what the user is inside the creates session', user);

        if (!user || req?.body?.password === user?.hash) {
            return res.status(400).json({
                message: 'Invalid email or password'
            });
        }

        return res.status(200).json({
            message: `Welcome ${user.name}`,
            data: {
                token: jwt.sign(user.toJSON(), 'finance', { expiresIn: `${1000 * 60 * 60 * 24 * 7 * 4}` })
            }
        })

    } catch (err) {
        console.log('Error in the create Session module', err);
        res.send(err)
    }
}

export const ytUpdate = async function (req, res) {
    console.log('API : /update-yt-links')
    try {
        const { ytId, link } = req?.body

        if (!ytId && !url) {
            return res.status(400).json({
                message: 'Invalid Credentials or Details'
            })
        }

        let ytdb = await YouTubeLinks.findOne({ ytId })

        if (ytdb) {
            ytdb.link = link;
            ytdb.save()
        } else {
            ytdb = await YouTubeLinks.create({ ytId, link })
        }
        
        return res.status(200).json({
            message: 'Link Updated Successfully'
        })

    } catch (error) {
        if (error) {
            return res.status(500).json({
                message: 'Internal Server Error'
            })
        }
    }
}

export const imageUpdate = async function (req,res){
    console.log('API : /update-image')
    try {
        await Image.uploadImage(req,res,async function(err){
            if(err){
                console.log('LOG : Multer Error',err)
                return res.status(500).json({
                    message : 'Internal Server Error'
                })
            }   
            const {imageId} = req.body 
            if(req.file){
                console.log('INFO : FILE INFO',req?.file)

                let imagedb = await Image.findOne({imageId : imageId})

                if(!imagedb){
                    imagedb = await Image.create({imageId})
                }

                if(imagedb.path){
                    fs.unlinkSync(path.join(__dirname , imagedb.path))
                }
                imagedb.path = Image.imagePath + '/' + req.file.filename
                imagedb.save()
            }
        })
    } catch (error) {
        
    }
}

export const textUpdate = async function (req, res) {
    console.log('API : /update-yt-links')
    try {
        const { textId, text } = req?.body

        if (!textId && !text) {
            return res.status(400).json({
                message: 'Invalid Credentials or Details'
            })
        }

        let textdb = await Text.findOne({ textId })

        if (textdb) {
            textdb.text = text;
            textdb.save()
        } else {
            textdb = await Text.create({ textId, text })
        }
        
        return res.status(200).json({
            message: 'Text Updated Successfully'
        })

    } catch (error) {
        if (error) {
            return res.status(500).json({
                message: 'Internal Server Error'
            })
        }
    }
}