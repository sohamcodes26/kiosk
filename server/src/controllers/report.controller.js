import Transaction from "../models/Transaction.js";

export const getReport = async (req, res) => {
  try {
    const { startDate, endDate, type } = req.query;

    let filter = {};

    if (startDate && endDate) {
      filter.createdAt = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      };
    }

    if (type && type !== "ALL") {
      filter.type = type;
    }

    const transactions = await Transaction.find(filter).sort({ createdAt: -1 });

    res.status(200).json(transactions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching report" });
  }
};