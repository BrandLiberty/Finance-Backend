const PORT = process.env.PORT || 8000

import express from 'express'
import cors from 'cors'
const app = express()
import path from 'path'
const __dirname = path.resolve(path.dirname(''));

// Connecting to the database 
import db from './config/mongoose.js'

// Enable CORS 
app.use(cors())

// Enabling Body Parser 
app.use(express.urlencoded())
// app.use(express.json())

// Mapping routes 
import router from './routes/index.js'
app.use('/',router)

app.use('/uploads',express.static(__dirname + '/uploads'))

// Listening to the Port 
app.listen(PORT , err=>{
    if(err){
        console.log('ERROR : Unable to listen at the PORT',PORT)
        return 
    }
    console.log('LOG : Successfully connected to the PORT at ',PORT)
})
