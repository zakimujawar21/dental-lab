const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const { getDoctorBilling } = require("../controllers/billingController");

router.use(protect);

router.get("/doctor/:doctorId", getDoctorBilling);

module.exports = router;