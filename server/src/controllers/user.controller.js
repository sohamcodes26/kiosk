import { Aadhaar } from "../models/aadhaar.model.js";
import { BankAccount } from "../models/bankAccount.model.js";
import Transaction from "../models/Transaction.js";
import { FixedDeposit } from "../models/fd.model.js";
import { logTransaction } from "../utils/transactionLogger.js";
import fs from "fs";
import path from "path";

const logError = (error) => {
    const logPath = path.join(process.cwd(), "error_log.txt");
    const timestamp = new Date().toISOString();
    const errorMsg = `\n[${timestamp}] ERROR: ${error.message}\nSTACK: ${error.stack}\n${JSON.stringify(error, null, 2)}\n${"=".repeat(50)}`;
    fs.appendFileSync(logPath, errorMsg);
};


// Utility to generate random ID
const generateId = () => Math.random().toString(36).substr(2, 9);

export const createDummyUser = async (req, res) => {
    try {
        const userId = "demoUser123";
        const aadhaarNumber = "123456789012";
        const fingerprintId = "SIMULATED_FINGERPRINT_001";

        // Check if dummy user already exists
        const existingAadhaar = await Aadhaar.findOne({ aadhaarNumber });
        if (existingAadhaar) {
            return res.status(400).json({ 
                success: false, 
                message: "Dummy user already initialized" 
            });
        }

        const dummyAadhaar = new Aadhaar({
            userId,
            aadhaarNumber,
            fullName: "Soham Kolte",
            motherName: "Sunita Kolte",
            fatherName: "Kishor Kolte",
            address: "123 Main Street, Pune, Maharashtra",
            fingerprintId
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
            fingerprintId,
            balance: 10000,
            pin: "1234"
        });

        await dummyAadhaar.save();
        await dummyBankAccount.save();

        res.status(201).json({
            success: true,
            message: "Dummy user generated successfully",
            data: {
                aadhaar: dummyAadhaar,
                bankAccount: dummyBankAccount
            }
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ 
            success: false, 
            message: "Internal Server Error" 
        });
    }
};

// Helper to ensure dummy user exists for demo purposes
const ensureDummyUser = async (userId = "demoUser123") => {
    const aadhaarNumber = "123456789012";
    const accountNumber = "MSB000123456";
    const fingerprintId = "SIMULATED_FINGERPRINT_001";

    // Use findOneAndUpdate with unique identifiers to prevent duplicate key errors
    await Aadhaar.findOneAndUpdate(
        { aadhaarNumber }, // Search by Aadhaar number to avoid clashes
        {
            userId,
            fullName: "Soham Kolte",
            motherName: "Sunita Kolte",
            fatherName: "Kishor Kolte",
            address: "123 Main Street, Pune, Maharashtra",
            fingerprintId
        },
        { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    const bankAccount = await BankAccount.findOneAndUpdate(
        { $or: [{ userId }, { accountNumber }] }, // Search by any unique field
        {
            userId,
            aadhaarNumber,
            phoneNumber: "9876543210",
            accountNumber: "MSB000123456",
            address: "123 Main Street, Pune, Maharashtra",
            bankName: "Maharashtra State Bank",
            branchName: "Pune Central",
            accountType: "Savings",
            panNo: "ABCDE1234F",
            fingerprintId,
            balance: 10000, // Re-initialize only if it's a new demo session
            pin: "1234"
        },
        { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    return bankAccount;
};

// Simulate login using fingerprint ID
export const simulateFingerprintLogin = async (req, res) => {
    try {
        const fingerprintId = req.body.fingerprintId || "SIMULATED_FINGERPRINT_001";
        
        // Ensure dummy records exist
        await ensureDummyUser();

        // Fetch user from Aadhaar DB
        const aadhaarData = await Aadhaar.findOne({ fingerprintId });
        
        if (!aadhaarData) {
            return res.status(404).json({ 
                success: false, 
                message: "User not found!" 
            });
        }

        // Fetch Bank Data
        const bankData = await BankAccount.findOne({ 
            aadhaarNumber: aadhaarData.aadhaarNumber 
        });

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

        // ✅ LOG TRANSACTION
        await logTransaction({
            userId: aadhaarData.userId,
            type: "REQUEST",
            subType: "LOGIN"
        });

        res.status(200).json({
            success: true,
            message: "Login Successful",
            user: userData
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ 
            success: false, 
            message: "Internal Server Error" 
        });
    }
};

export const withdrawMoney = async (req, res) => {
    try {
        const { amount, userId } = req.body;
        const targetUserId = userId || "demoUser123";

        // Ensure dummy records exist
        await ensureDummyUser(targetUserId);

        // Verify balance
        const account = await BankAccount.findOne({ userId: targetUserId });
        if (!account) throw new Error("Account not found even after initialization");

        if (account.balance < amount) {
            return res.status(400).json({ success: false, message: "Insufficient balance" });
        }

        await logTransaction({
            userId: targetUserId,
            type: "WITHDRAW",
            amount: Number(amount)
        });

        res.status(200).json({
            success: true,
            message: "Withdrawal successful"
        });

    } catch (error) {
        logError(error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const depositMoney = async (req, res) => {
    try {
        const { amount, userId } = req.body;
        const targetUserId = userId || "demoUser123";

        // Ensure dummy records exist
        await ensureDummyUser(targetUserId);

        await logTransaction({
            userId: targetUserId,
            type: "DEPOSIT",
            amount: Number(amount)
        });

        res.status(200).json({
            success: true,
            message: "Deposit successful"
        });

    } catch (error) {
        logError(error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const processRequest = async (req, res) => {
    try {
        const { subType, userId } = req.body;
        const targetUserId = userId || "demoUser123";

        // Ensure dummy records exist
        await ensureDummyUser(targetUserId);

        await logTransaction({
            userId: targetUserId,
            type: "REQUEST",
            subType
        });

        res.status(200).json({
            success: true,
            message: `${subType} request processed successfully`
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Request processing failed"
        });
    }
};

export const getBalance = async (req, res) => {
    try {
        const { userId } = req.params;
        const targetUserId = userId || "demoUser123";
        
        // Ensure dummy records exist if it's the demo user
        if (targetUserId === "demoUser123") {
            await ensureDummyUser(targetUserId);
        }

        const account = await BankAccount.findOne({ userId: targetUserId });
        if (!account) return res.status(404).json({ success: false, message: "Account not found" });

        res.status(200).json({ success: true, balance: account.balance ?? 0 });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getMiniStatement = async (req, res) => {
    try {
        const { userId } = req.params;
        const targetUserId = userId || "demoUser123";
        
        // Ensure dummy records exist if it's the demo user
        if (targetUserId === "demoUser123") {
            await ensureDummyUser(targetUserId);
        }

        const transactions = await Transaction.find({ userId: targetUserId })
            .sort({ createdAt: -1 })
            .limit(5);

        res.status(200).json({ success: true, transactions });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getFullStatement = async (req, res) => {
    try {
        const { userId, startDate, endDate } = req.query;
        const targetUserId = userId || "demoUser123";
        
        // Ensure dummy records exist if it's the demo user
        if (targetUserId === "demoUser123") {
            await ensureDummyUser(targetUserId);
        }

        let query = { userId: targetUserId };

        if (startDate && endDate) {
            query.createdAt = {
                $gte: new Date(startDate),
                $lte: new Date(endDate)
            };
        }

        const transactions = await Transaction.find(query).sort({ createdAt: -1 });
        res.status(200).json({ success: true, transactions });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const openFD = async (req, res) => {
    try {
        const { userId, amount, duration } = req.body;
        const targetUserId = userId || "demoUser123";
        
        // Ensure dummy records exist if it's the demo user
        if (targetUserId === "demoUser123") {
            await ensureDummyUser(targetUserId);
        }

        const rate = 6.5; // Static rate as discussed
        const maturityAmount = amount + (amount * rate * (duration / 12)) / 100;

        // Check balance
        const account = await BankAccount.findOne({ userId: targetUserId });
        if (account.balance < amount) {
            return res.status(400).json({ success: false, message: "Insufficient balance" });
        }

        // Create FD
        await FixedDeposit.create({
            userId: targetUserId,
            amount,
            duration,
            interestRate: rate,
            maturityAmount
        });

        // Log transaction and deduct balance
        await logTransaction({
            userId: targetUserId,
            type: "WITHDRAW",
            subType: "FD_OPENING",
            amount,
            status: "SUCCESS"
        });

        res.status(201).json({ success: true, message: "Fixed Deposit created successfully", maturityAmount });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const changePin = async (req, res) => {
    try {
        const { userId, oldPin, newPin } = req.body;
        const targetUserId = userId || "demoUser123";
        
        // Ensure dummy records exist if it's the demo user
        if (targetUserId === "demoUser123") {
            await ensureDummyUser(targetUserId);
        }

        const account = await BankAccount.findOne({ userId: targetUserId });

        if (account.pin !== oldPin) {
            return res.status(400).json({ success: false, message: "Incorrect old PIN" });
        }

        account.pin = newPin;
        await account.save();

        await logTransaction({
            userId: targetUserId,
            type: "REQUEST",
            subType: "PIN_CHANGE"
        });

        res.status(200).json({ success: true, message: "PIN updated successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};