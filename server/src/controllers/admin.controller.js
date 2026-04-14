import Transaction from "../models/Transaction.js";

export const getAnalytics = async (req, res) => {
    try {
        const stats = await Transaction.aggregate([
            {
                $group: {
                    _id: "$type",
                    totalAmount: { $sum: "$amount" },
                    count: { $sum: 1 }
                }
            }
        ]);

        const analytics = {
            totalDeposits: 0,
            totalWithdrawals: 0,
            totalTransactions: 0,
            todayActivity: 0
        };

        stats.forEach(s => {
            if (s._id === "DEPOSIT") analytics.totalDeposits = s.totalAmount;
            if (s._id === "WITHDRAW") analytics.totalWithdrawals = s.totalAmount;
            analytics.totalTransactions += s.count;
        });

        // Today's activity
        const startOfDay = new Date();
        startOfDay.setHours(0, 0, 0, 0);
        analytics.todayActivity = await Transaction.countDocuments({
            createdAt: { $gte: startOfDay }
        });

        res.status(200).json({ success: true, analytics });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const downloadReportCSV = async (req, res) => {
    try {
        const transactions = await Transaction.find().sort({ createdAt: -1 });

        let csv = "Date,User ID,Type,Sub-type,Amount,Status\n";
        transactions.forEach(t => {
            const date = new Date(t.createdAt).toLocaleString();
            csv += `${date},${t.userId},${t.type},${t.subType || "-"},${t.amount},${t.status}\n`;
        });

        res.setHeader("Content-Type", "text/csv");
        res.setHeader("Content-Disposition", "attachment; filename=transaction_report.csv");
        res.status(200).send(csv);
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
