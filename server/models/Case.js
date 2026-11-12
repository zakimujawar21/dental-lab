const mongoose = require("mongoose");

const caseSchema = new mongoose.Schema(
    {
        doctor: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Doctor",
            required: true,
        },
        patientName: {
            type: String,
            required: true,
            trim: true,
        },
        workType: {
            type: String,
            required: true,
        },
        caseDate: {
            type: Date,
            default: Date.now,
        },
        deliveryDate: {
            type: Date,
            required: true,
        },
        rateAtTime: {
            type: Number,
            required: true,
            min: 0,
        },
        challanNumber: {
            type: String,
            unique: true,
        },
        status: {
            type: String,
            enum: ["Pending", "In Progress", "Completed", "Delivered"],
            default: "Pending",
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Case", caseSchema);