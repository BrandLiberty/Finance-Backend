import mongoose from 'mongoose'

// const MONGO_URL = "mongodb+srv://finance:finance_dbpassword%40123@cluster0.sz2dqqw.mongodb.net/?retryWrites=true&w=majority"
const MONGO_URL = "mongodb://127.0.0.1/finance_db"
const HOSTED_MONGO_URL = "mongodb+srv://financesourceinnoavation:FianaceInnovationPassword%40123@cluster0.b3yeftl.mongodb.net/?retryWrites=true&w=majority"
mongoose.connect(HOSTED_MONGO_URL,{
    useNewUrlParser : true,
    useUnifiedTopology : true
});

const db = mongoose.connection;

db.on('error',console.error.bind(console,'Erroe connecting MOngoDB'));

db.once('open',function(){
    console.log("LOG : Successfully connected to the MONGO_URL",MONGO_URL); 
})

export default db

