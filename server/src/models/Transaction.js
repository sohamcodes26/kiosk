import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ["WITHDRAW", "DEPOSIT", "REQUEST"],
    required: true
  },
  subType: {
    type: String // ATM_CARD, CHEQUE_BOOK etc.
  },
  amount: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    default: "SUCCESS"
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("Transaction", transactionSchema);