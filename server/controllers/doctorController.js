const Doctor = require("../models/Doctor");

// ADD DOCTOR
const addDoctor = async (req, res) => {
    try {
        const { name, email, phone, clinicName, address, rates } = req.body;

        if (!name || !phone) {
            return res.status(400).json({
                message: "Name and phone are required",
            });
        }

        const doctor = await Doctor.create({
            name,
            email,
            phone,
            clinicName,
            address,
            rates,
        });

        res.status(201).json({
            message: "Doctor added successfully",
            doctor,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// GET ALL DOCTORS + SEARCH
const getDoctors = async (req, res) => {
    try {
        const search = req.query.search || "";

        const doctors = await Doctor.find({
            $or: [
                { name: { $regex: search, $options: "i" } },
                { phone: { $regex: search, $options: "i" } },
                { clinicName: { $regex: search, $options: "i" } },
            ],
        }).sort({ createdAt: -1 });

        res.status(200).json({
            count: doctors.length,
            doctors,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// GET SINGLE DOCTOR
const getDoctorById = async (req, res) => {
    try {
        const doctor = await Doctor.findById(req.params.id);

        if (!doctor) {
            return res.status(404).json({
                message: "Doctor not found",
            });
        }

        res.status(200).json(doctor);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// UPDATE DOCTOR
const updateDoctor = async (req, res) => {
    try {
        const doctor = await Doctor.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true,
            }
        );

        if (!doctor) {
            return res.status(404).json({
                message: "Doctor not found",
            });
        }

        res.status(200).json({
            message: "Doctor updated successfully",
            doctor,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// DELETE DOCTOR
const deleteDoctor = async (req, res) => {
    try {
        const doctor = await Doctor.findByIdAndDelete(req.params.id);

        if (!doctor) {
            return res.status(404).json({
                message: "Doctor not found",
            });
        }

        res.status(200).json({
            message: "Doctor deleted successfully",
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    addDoctor,
    getDoctors,
    getDoctorById,
    updateDoctor,
    deleteDoctor,
};