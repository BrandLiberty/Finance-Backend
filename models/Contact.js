import mongoose from "mongoose"; //ODM Object Document Mapper

const contactSchema = new mongoose.Schema({
    fullName : {
        type: String
    },
    email: {
        type: String,
        required : true
    },
    address: {
        type: String
    },
    contactNumber: {
        type: String
    },
    message: {
        type: String
    }
},{
    timestamps: true,
})

const Contact = mongoose.model('Contact', contactSchema)

export default Contact