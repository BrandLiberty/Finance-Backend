import mongoose from "mongoose";


const loanSchema = new mongoose.Schema({
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
    loanType: {
        type: String
    },
    contactNumber: {
        type: String
    },
}, {
    timestamps: true
})

const Loan = mongoose.model('Loan', loanSchema)

export default Loan