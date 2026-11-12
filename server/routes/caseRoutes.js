const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
    addCase,
    getCases,
    getCaseById,
    updateCase,
    deleteCase,
} = require("../controllers/caseController");

router.use(protect);

router.post("/", addCase);
router.get("/", getCases);
router.get("/:id", getCaseById);
router.put("/:id", updateCase);
router.delete("/:id", deleteCase);

module.exports = router;