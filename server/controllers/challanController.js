const Case = require("../models/Case");

// GET ALL CHALLANS + SEARCH
const getChallans = async (req, res) => {
    try {
        const search = req.query.search || "";

        const challans = await Case.find({
            challanNumber: { $regex: search, $options: "i" },
        })
            .populate("doctor", "name clinicName phone address")
            .sort({ createdAt: -1 });

        res.status(200).json({
            count: challans.length,
            challans,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// GET SINGLE CHALLAN
const getChallanById = async (req, res) => {
    try {
        const challan = await Case.findById(req.params.id)
            .populate("doctor", "name clinicName phone address");

        if (!challan) {
            return res.status(404).json({
                message: "Challan not found",
            });
        }

        res.status(200).json(challan);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getChallans,
    getChallanById,
};