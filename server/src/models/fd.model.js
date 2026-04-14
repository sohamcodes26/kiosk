import mongoose from "mongoose";

const fdSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    duration: {
        type: Number, // in months
        required: true
    },
    interestRate: {
        type: Number,
        required: true
    },
    maturityAmount: {
        type: Number,
        required: true
    }
}, { timestamps: true });

export const FixedDeposit = mongoose.model("FixedDeposit", fdSchema);
