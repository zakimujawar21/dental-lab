const Doctor = require("../models/Doctor");
const Case = require("../models/Case");
const Payment = require("../models/Payment");

// GET DASHBOARD STATS
const getDashboardStats = async (req, res) => {
    try {
        const [
            totalDoctors,
            totalCases,
            pendingCases,
            inProgressCases,
            completedCases,
            deliveredCases,
            payments,
            cases,
        ] = await Promise.all([
            Doctor.countDocuments(),
            Case.countDocuments(),
            Case.countDocuments({ status: "Pending" }),
            Case.countDocuments({ status: "In Progress" }),
            Case.countDocuments({ status: "Completed" }),
            Case.countDocuments({ status: "Delivered" }),
            Payment.find(),
            Case.find(),
        ]);

        const totalWorkAmount = cases.reduce(
            (sum, item) => sum + item.rateAtTime,
            0
        );

        const totalPayments = payments.reduce(
            (sum, item) => sum + item.amount,
            0
        );

        res.status(200).json({
            totalDoctors,
            totalCases,
            pendingCases,
            inProgressCases,
            completedCases,
            deliveredCases,
            totalWorkAmount,
            totalPayments,
            outstandingBalance: totalWorkAmount - totalPayments,
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getDashboardStats };