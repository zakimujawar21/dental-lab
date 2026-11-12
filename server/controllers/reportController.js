const Case = require("../models/Case");
const Payment = require("../models/Payment");

// GET REPORTS
const getReports = async (req, res) => {
    try {
        const { startDate, endDate } = req.query;

        const filter = {};

        if (startDate || endDate) {
            filter.createdAt = {};

            if (startDate) {
                filter.createdAt.$gte = new Date(startDate);
            }

            if (endDate) {
                const end = new Date(endDate);
                end.setHours(23, 59, 59, 999);
                filter.createdAt.$lte = end;
            }
        }

        const cases = await Case.find(filter);
        const payments = await Payment.find(
            startDate || endDate
                ? { paymentDate: filter.createdAt }
                : {}
        );

        const totalCases = cases.length;

        const completedCases = cases.filter(
            item => item.status === "Completed" || item.status === "Delivered"
        ).length;

        const pendingCases = cases.filter(
            item => item.status === "Pending"
        ).length;

        const totalWorkAmount = cases.reduce(
            (sum, item) => sum + item.rateAtTime,
            0
        );

        const totalPayments = payments.reduce(
            (sum, item) => sum + item.amount,
            0
        );

        res.status(200).json({
            totalCases,
            completedCases,
            pendingCases,
            totalWorkAmount,
            totalPayments,
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getReports };