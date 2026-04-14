import Transaction from "../models/Transaction.js";

export const addDummyTransaction = async (req, res) => {
  try {
    const txn = await Transaction.create({
      type: "WITHDRAW",
      amount: 5000,
      status: "SUCCESS"
    });

    res.json({
      message: "Dummy transaction added",
      data: txn
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};