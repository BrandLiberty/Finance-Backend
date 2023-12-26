import mongoose, { Schema } from "mongoose";

const youTubeLinkSchema = new Schema({
    ytId : {
        type : String,
        required: true,
        unique : true
    },
    link : {
        type : String,
        required: true,
        unique : true
    }
},{
    timestamps : true
})

const YouTubeLinks = mongoose.model('YouTubeLinks',youTubeLinkSchema)

export default YouTubeLinks