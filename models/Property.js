import path from 'path'
const __dirname = path.resolve(path.dirname(''));
import mongoose, { Schema } from "mongoose";
import multer from "multer";
const IMAGE_PATH = path.join('/uploads');

const propertySchema = new mongoose.Schema({
    prptId: {
        type: String,
        required: true,
        unique : true
    },
    prjName: {
        type: String,
       
    },
    prptDsc: {
        type: String,
       
    },
    prptDest: {
        type: String,
       
    },
    mainImg: {
        type: String,
        
    },
    imgArr: [
        {
            type: String,
            
        }
    ]
}, {
    timestamps: true
})

let count = 1
let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, IMAGE_PATH))
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now();
        cb(null, file.fieldname + ++count + '-' + uniqueSuffix)
    }
})

propertySchema.statics.uploadImgArr = multer({ storage: storage,limits: { fileSize: 5 * 1024 * 1024 *100} }).fields([{ name: 'mainImg', maxCount: 1 }, { name: 'imgArr', maxCount: 6 }]);
// userSchema.statics.uploadImages = multer({storage : storage})
propertySchema.statics.imagePath = IMAGE_PATH;

const Property = mongoose.model('Property', propertySchema)

export default Property