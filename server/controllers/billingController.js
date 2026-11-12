const Case = require("../models/Case");
const Payment = require("../models/Payment");
const Doctor = require("../models/Doctor");
const calculateBalance = require("../utils/calculateBalance");

// GET DOCTOR-WISE BILLING
const getDoctorBilling = async (req, res) => {
    try {
        const { doctorId } = req.params;

        const doctor = await Doctor.findById(doctorId);

        if (!doctor) {
            return res.status(404).json({
                message: "Doctor not found",
            });
        }

        const cases = await Case.find({ doctor: doctorId });

        const payments = await Payment.find({ doctor: doctorId })
            .sort({ paymentDate: -1 });

        const newWorkAmount = cases.reduce(
            (total, item) => total + item.rateAtTime,
            0
        );

        const paymentsReceived = payments.reduce(
            (total, item) => total + item.amount,
            0
        );

        const balance = calculateBalance({
            newWorkAmount,
            paymentsReceived,
        });

        // res.status(200).json({
        //     doctor,
        //     totalCases: cases.length,
        //     ...balance,
        //     cases,
        //     payments,
        // });
        res.status(200).json({
            doctor,
            totalCases: cases.length,

            totalWorkAmount: balance.newWorkAmount,
            totalPayments: balance.paymentsReceived,
            remainingBalance: balance.remainingBalance,

            cases,
            payments,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getDoctorBilling };