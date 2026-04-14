import Transaction from "../models/Transaction.js";
import { BankAccount } from "../models/bankAccount.model.js";

/**
 * Log a transaction and automatically update the corresponding BankAccount balance.
 * 
 * @param {Object} params
 * @param {string} params.userId - The ID of the user performing the transaction.
 * @param {string} params.type - The transaction type (WITHDRAW, DEPOSIT, REQUEST).
 * @param {number} [params.amount=0] - The transaction amount.
 * @param {string} [params.subType] - Additional transaction subdivision (ATM_CARD, FD, etc.).
 * @param {string} [params.status="SUCCESS"] - The final outcome of the operation.
 * @returns {Promise<Object>} - The created transaction object.
 */
export const logTransaction = async ({ userId, type, amount = 0, subType = "", status = "SUCCESS" }) => {
    try {
        // Safety check for amount
        const transactionAmount = isNaN(Number(amount)) ? 0 : Number(amount);

        // 1. Create Transaction Entry
        const transaction = await Transaction.create({
            userId,
            type,
            subType,
            amount: transactionAmount,
            status
        });

        // 2. Update BankAccount balance if it's a financial transaction
        if (status === "SUCCESS") {
            if (type === "WITHDRAW") {
                await BankAccount.findOneAndUpdate(
                    { userId },
                    { $inc: { balance: -Math.abs(transactionAmount) } },
                    { upsert: true, setDefaultsOnInsert: true }
                );
            } else if (type === "DEPOSIT") {
                await BankAccount.findOneAndUpdate(
                    { userId },
                    { $inc: { balance: Math.abs(transactionAmount) } },
                    { upsert: true, setDefaultsOnInsert: true }
                );
            }
        }

        return transaction;
    } catch (error) {
        console.error("Logger Error:", error);
        throw error;
    }
};
