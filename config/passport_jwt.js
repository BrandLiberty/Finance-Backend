import passport from 'passport';
import passportJWT from 'passport-jwt'
const JWTStrategy = passportJWT.Strategy
const ExtractJWT = passportJWT.ExtractJwt
import User from "../models/User.js"

let opts = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'finance',
    passReqToCallback: true
}

passport.use(new JWTStrategy(opts, async function (req, jwtPayload, done) {
    console.log('LOG : Passing through passport Jwt')
    // User.findById(jwtPayload._id)
    //     .then(user => {
    //         if (user) {
    //             req.user = user
    //             if (user.verified === false || user.underUpdate === true) {
    //                 console.log(`LOG : ${user.email} unverified`)
    //                 return done(null, false);
    //             }
    //             return done(null, user)
    //         } else {
    //             console.log('LOG : User unidentified')
    //             return done(null, false);
    //         }
    //     })
    //     .catch(err => {
    //         console.log('Error finding user through JWT._id', err);
    //     })
    if(jwtPayload.id==='123456' && jwtPayload.password === '123456'){
        return done(null, jwtPayload)
    }else{
        return done(null, false);
    }
}))

export default passport
