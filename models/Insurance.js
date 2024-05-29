import mongoose from "mongoose";


const insuranceSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
    },
    address: {
        type: String,
    },
    birthDate: {
        type: String,
    },
    city: {
        type: String,
    },
    state: {
        type: String,
    },
    zip: {
        type: String
    },
    insuranceType: {
        type: String
    },
    contactNumber: {
        type: String
    },
}, {
    timestamps: true
})

const Insurance = mongoose.model('Insurance', insuranceSchema)

export default Insurance