import { Aadhaar } from "../models/aadhaar.model.js";
import { BankAccount } from "../models/bankAccount.model.js";

// Utility to generate random ID
const generateId = () => Math.random().toString(36).substr(2, 9);

export const createDummyUser = async (req, res) => {
    try {
        const userId = generateId();
        const aadhaarNumber = "123456789012";
        const fingerprintId = "SIMULATED_FINGERPRINT_001";

        // Check if dummy user already exists
        const existingAadhaar = await Aadhaar.findOne({ aadhaarNumber });
        if (existingAadhaar) {
            return res.status(400).json({ success: false, message: "Dummy user already initialized" });
        }

        const dummyAadhaar = new Aadhaar({
            userId,
            aadhaarNumber,
            fullName: "Soham Kolte",
            motherName: "Sunita Kolte",
            fatherName: "Kishor Kolte",
            address: "123 Main Street, Pune, Maharashtra",
            fingerprintId // Simulated fingerprint 
        });

        const dummyBankAccount = new BankAccount({
            userId,
            aadhaarNumber,
            phoneNumber: "9876543210",
            accountNumber: "MSB000123456",
            address: "123 Main Street, Pune, Maharashtra",
            bankName: "Maharashtra State Bank",
            branchName: "Pune Central",
            accountType: "Savings",
            panNo: "ABCDE1234F",
            fingerprintId // Matches the Aadhaar fingerprint ID logically
        });

        await dummyAadhaar.save();
        await dummyBankAccount.save();

        res.status(201).json({
            success: true,
            message: "Dummy user generated successfully with simulated fingerprint ID",
            data: { aadhaar: dummyAadhaar, bankAccount: dummyBankAccount }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

// Simulate login using fingerprint ID
export const simulateFingerprintLogin = async (req, res) => {
    try {
        // Since we are simulating, we'll just hardcode or accept from body
        const fingerprintId = req.body.fingerprintId || "SIMULATED_FINGERPRINT_001";

        // Fetch user from Aadhaar DB
        const aadhaarData = await Aadhaar.findOne({ fingerprintId });
        
        if (!aadhaarData) {
            return res.status(404).json({ success: false, message: "User not found!" });
        }

        // Fetch detailed Bank Data via mapping
        const bankData = await BankAccount.findOne({ aadhaarNumber: aadhaarData.aadhaarNumber });

        // Compile combined response object
        const userData = {
            userId: aadhaarData.userId,
            fullName: aadhaarData.fullName,
            aadhaarNumber: aadhaarData.aadhaarNumber,
            phoneNumber: bankData.phoneNumber,
            accountNumber: bankData.accountNumber,
            bankName: bankData.bankName,
            branchName: bankData.branchName,
            accountType: bankData.accountType,
            address: bankData.address 
        };

        res.status(200).json({
            success: true,
            message: "Login Successful",
            user: userData
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};