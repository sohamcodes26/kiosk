import mongoose from "mongoose";

const bankAccountSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        unique: true
    },
    aadhaarNumber: {
        type: String,
        required: true,
        unique: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    accountNumber: {
        type: String,
        required: true,
        unique: true
    },
    address: {
        type: String,
        required: true
    },
    bankName: {
        type: String,
        required: true
    },
    branchName: {
        type: String,
        required: true
    },
    accountType: {
        type: String,
        enum: ["Savings", "Current", "Salary"],
        required: true
    },
    panNo: {
        type: String,
        required: true,
        unique: true
    },
    fingerprintId: {
        type: String,
        default: null
    }
}, { timestamps: true });

export const BankAccount = mongoose.model("BankAccount", bankAccountSchema);