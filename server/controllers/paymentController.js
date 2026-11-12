const Payment = require("../models/Payment");
const Doctor = require("../models/Doctor");

// ADD PAYMENT
const addPayment = async (req, res) => {
    try {
        const {
            doctor,
            amount,
            paymentDate,
            paymentMethod,
            transactionId,
            notes,
        } = req.body;

        if (!doctor || !amount || amount <= 0) {
            return res.status(400).json({
                message: "Valid doctor and payment amount are required",
            });
        }

        const doctorExists = await Doctor.findById(doctor);

        if (!doctorExists) {
            return res.status(404).json({
                message: "Doctor not found",
            });
        }

        const payment = await Payment.create({
            doctor,
            amount,
            paymentDate,
            paymentMethod,
            transactionId,
            notes,
        });

        res.status(201).json({
            message: "Payment added successfully",
            payment,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// GET ALL PAYMENTS
const getPayments = async (req, res) => {
    try {
        const payments = await Payment.find()
            .populate("doctor", "name clinicName")
            .sort({ paymentDate: -1 });

        res.status(200).json({
            count: payments.length,
            payments,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// GET PAYMENTS OF ONE DOCTOR
const getDoctorPayments = async (req, res) => {
    try {
        const payments = await Payment.find({
            doctor: req.params.doctorId,
        })
            .populate("doctor", "name clinicName")
            .sort({ paymentDate: -1 });

        res.status(200).json({
            count: payments.length,
            payments,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    addPayment,
    getPayments,
    getDoctorPayments,
};