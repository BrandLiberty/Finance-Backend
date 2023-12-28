import path from 'path'
const __dirname = path.resolve(path.dirname(''));
import mongoose, { Schema } from "mongoose";
import multer from "multer";
const IMAGE_PATH = path.join('/uploads');

const imageSchema = new mongoose.Schema({
    imageId : {
        type : String,
        required: true,
        unique : true
    },
    path : {
        type : String,
        required: true,
    }
},{
    timestamps : true
})

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, IMAGE_PATH))
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now();
        cb(null, file.fieldname + '-' + uniqueSuffix)
    }
})

imageSchema.statics.uploadImage = multer({ storage: storage }).array('images');
// userSchema.statics.uploadImages = multer({storage : storage})
imageSchema.statics.imagePath = IMAGE_PATH;


const Image = mongoose.model('Image',imageSchema)

export default Image