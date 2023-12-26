import User from "../models/User.js";
import jwt from 'jsonwebtoken'

export const createSession = async function (req, res) {
    try {
        console.log('API : /create-session', req?.body)
        const { id, password } = req.body
        let user = {
            id : id,
            password : password
        }
        // trial 
        if (id === '123456' && password === '123456') {
            return res.status(200).json({
                message: `Welcome Admin`,
                data: {
                    token: jwt.sign(user, 'finance', { expiresIn: `${1000 * 60 * 60 * 24 * 7 * 4}` })
                }
            })
        }else{
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