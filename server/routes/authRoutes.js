const express = require("express");
const router = express.Router();

const { loginAdmin } = require("../controllers/authController");
const protect = require("../middleware/authMiddleware");

router.post("/login", loginAdmin);

router.get("/verify", protect, (req, res) => {
    res.status(200).json({
        message: "Authentication verified successfully!",
        adminId: req.adminId,
    });
});

module.exports = router;