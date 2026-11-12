const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
    getChallans,
    getChallanById,
} = require("../controllers/challanController");

router.use(protect);

router.get("/", getChallans);
router.get("/:id", getChallanById);

module.exports = router;