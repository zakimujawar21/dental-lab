const Case = require("../models/Case");
const Doctor = require("../models/Doctor");
const generateChallan = require("../utils/generateChallan");

// ADD CASE
const addCase = async (req, res) => {
    try {
        const {
            doctor,
            patientName,
            workType,
            caseDate,
            deliveryDate,
            status,
        } = req.body;

        if (!doctor || !patientName || !workType || !deliveryDate) {
            return res.status(400).json({
                message: "Doctor, patient name, work type and delivery date are required",
            });
        }

        const doctorData = await Doctor.findById(doctor);

        if (!doctorData) {
            return res.status(404).json({ message: "Doctor not found" });
        }

        const rate = doctorData.rates.find(
            (item) => item.workType.toLowerCase() === workType.toLowerCase()
        );

        if (!rate) {
            return res.status(400).json({
                message: "Rate not found for this work type. Update doctor's rates first.",
            });
        }

        const challanNumber = await generateChallan();

        const newCase = await Case.create({
            doctor,
            patientName,
            workType,
            caseDate: caseDate || Date.now(),
            deliveryDate,
            rateAtTime: rate.amount,
            challanNumber,
            status: status || "Pending",
        });

        const populatedCase = await Case.findById(newCase._id)
            .populate("doctor", "name clinicName phone");

        res.status(201).json({
            message: "Case added successfully",
            case: populatedCase,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// GET ALL CASES + SEARCH
const getCases = async (req, res) => {
    try {
        const search = req.query.search || "";

        const cases = await Case.find({
            $or: [
                { patientName: { $regex: search, $options: "i" } },
                { challanNumber: { $regex: search, $options: "i" } },
            ],
        })
            .populate("doctor", "name clinicName")
            .sort({ createdAt: -1 });

        res.status(200).json({
            count: cases.length,
            cases,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// GET SINGLE CASE
const getCaseById = async (req, res) => {
    try {
        const caseData = await Case.findById(req.params.id)
            .populate("doctor", "name clinicName phone");

        if (!caseData) {
            return res.status(404).json({ message: "Case not found" });
        }

        res.status(200).json(caseData);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// UPDATE CASE
const updateCase = async (req, res) => {
    try {
        const allowedFields = [
            "patientName",
            "workType",
            "caseDate",
            "deliveryDate",
            "status",
        ];

        const updates = {};

        allowedFields.forEach((field) => {
            if (req.body[field] !== undefined) {
                updates[field] = req.body[field];
            }
        });

        const caseData = await Case.findByIdAndUpdate(
            req.params.id,
            updates,
            { new: true, runValidators: true }
        ).populate("doctor", "name clinicName");

        if (!caseData) {
            return res.status(404).json({ message: "Case not found" });
        }

        res.status(200).json({
            message: "Case updated successfully",
            case: caseData,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// DELETE CASE
const deleteCase = async (req, res) => {
    try {
        const caseData = await Case.findByIdAndDelete(req.params.id);

        if (!caseData) {
            return res.status(404).json({ message: "Case not found" });
        }

        res.status(200).json({ message: "Case deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    addCase,
    getCases,
    getCaseById,
    updateCase,
    deleteCase,
};