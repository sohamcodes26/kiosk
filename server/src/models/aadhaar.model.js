import mongoose from "mongoose";

const aadhaarSchema = new mongoose.Schema({
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
    fullName: {
        type: String,
        required: true
    },
    motherName: {
        type: String,
        required: true
    },
    fatherName: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    fingerprintId: {
        type: String,
        default: null
    }
}, { timestamps: true });

export const Aadhaar = mongoose.model("Aadhaar", aadhaarSchema);