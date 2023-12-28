import User from "../models/User.js";
import YouTubeLinks from "../models/YouTubeLinks.js";
import Image from "../models/Image.js";
import Property from "../models/Property.js";
import jwt from 'jsonwebtoken'
import Text from "../models/Text.js";
import fs ,{existsSync} from 'node:fs'
import path from 'path'
const __dirname = path.resolve(path.dirname(''));

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
        console.log('Error 500', err)
        console.log('Error in the create Session module', err);
        res.send(err)
    }
}

export const ytUpdate = async function (req, res) {
    console.log('API : /update-yt-links', req.body)
    try {
        const { ytId, link } = req?.body

        if (!ytId && !link) {
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
            console.log('Error 500', error)
            return res.status(500).json({
                message: 'Internal Server Error'
            })
        }
    }
}

export const imageUpdate = async function (req, res) {
    console.log('API : /update-image')
    try {
        await Image.uploadImage(req, res, async function (err) {
            if (err) {
                console.log('LOG : Multer Error', err)
                return res.status(500).json({
                    message: 'Internal Server Error'
                })
            }
            const { imageId } = req.body
            if (req.file) {
                console.log('INFO : FILE INFO', req?.file)

                let imagedb = await Image.findOne({ imageId: imageId })

                if (!imagedb) {
                    imagedb = await Image.create({ imageId })
                }

                if (imagedb.path) {
                    fs.unlinkSync(path.join(__dirname, imagedb.path))
                }
                imagedb.path = Image.imagePath + '/' + req.file.filename
                imagedb.save()
            }
        })
    } catch (error) {
        if (error) {
            console.log('Error 500', error)
            return res.status(500).json({
                message: 'Internal Server Error'
            })
        }
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
            console.log('Error 500', error)
            return res.status(500).json({
                message: 'Internal Server Error'
            })
        }
    }
}

export const propertyUpdate = async (req, res) => {
    try {
        await Property.uploadImgArr(req, res, async function (err) {
            if (err) {
                console.log('LOG : Multer Error 1', err)
                return res.status(500).json({
                    message: 'Internal Server Error'
                })
            }
            console.log('API : /update-property', req.body)
            const { prptId, mainImg, imgArr, prjName, prptDest, prptDsc } = req.body

            if (!prptId) {
                return res.status(400).json({
                    message: 'Invalid Credentials or Details'
                })
            }

            let prptdb = await Property.findOne({ prptId })
            if (!prptdb) {
                prptdb = await Property.create({ prptId })
            }
            for (let el of Object.keys(req.body)) {
                switch (el) {
                    case 'prjName':
                        prptdb.prjName = prjName
                        break;
                    case 'prptDest':
                        prptdb.prptDest = prptDest
                        break;
                    case 'prptDsc':
                        prptdb.prptDsc = prptDsc
                        break;
                }
            }
            if (req.files['mainImg']) {
                if(prptdb.mainImg){
                    fs.unlinkSync(path.join(__dirname , prptdb.mainImg))
                }
                prptdb.mainImg = Property.imagePath + '/' + req.files['mainImg'][0].filename
            }
            console.log('IMAGE ARRAY',req.files['imgArr'])
            if(req.files['imgArr']){
                for(let el of prptdb.imgArr){
                    if(el){
                        fs.unlinkSync(path.join(__dirname , el))
                    }
                }
                prptdb.imgArr = [];
                for(let image of req.files['imgArr']){
                    prptdb.imgArr.push(Property.imagePath + '/' + image.filename)
                }
            }

            console.log('Final Updated PPRT ',prptdb)
            prptdb.save()
            return res.status(200).json({
                message: 'Property Updated Successfully'
            })

        })
    } catch (error) {
        if (error) {
            console.log('Error 500', error)
            return res.status(500).json({
                message: 'Internal Server Error'
            })
        }
    }
}

export const deleteProperty = async (req,res)=>{
    console.log('API : /get-property',req.params)
    const {id} = req.params
    try {
        Property.findOne({prptId : id})
        .then(data=>{
            if(data.mainImg){
                fs.unlinkSync(path.join(__dirname, data.mainImg))
            }
            if(data.imgArr?.length>0){
                for(let image of data.imgArr){
                    fs.unlinkSync(path.join(__dirname, image))
                }
            }
        })
        .catch(error=>{
            console.log('UNABLE TO UNLINKSYNC',error)
        })

        Property.findOneAndDelete({prptId : id})
        .then(data=>{
            return res.status(200).json({
                message : `${data.prjName} with id ${data.prptId} deleted`
            })
        })
        .catch(error=>{
            console.log('Error deleting the project',error)
            return res.status(400).json({
                message : 'No Property available for this id'
            })
        })

    } catch (error) {
        if(error){
            return res.status(500).json({
                message : 'Internal Server Error'
            })
        }
    }
}