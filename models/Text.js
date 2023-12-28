import mongoose, { Schema } from "mongoose";

const textSchema = new mongoose.Schema({
    textId : {
        type : String,
        required: true,
        unique : true
    },
    text : {
        type : String,
        required: true
    }
},{
    timestamps : true
})

const Text = mongoose.model('Text',textSchema)

export default Text