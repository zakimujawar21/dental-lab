const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
    addPayment,
    getPayments,
    getDoctorPayments,
} = require("../controllers/paymentController");

router.use(protect);

router.post("/", addPayment);
router.get("/", getPayments);
router.get("/doctor/:doctorId", getDoctorPayments);

module.exports = router;    