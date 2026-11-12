const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },

        email: {
            type: String,
            trim: true,
            lowercase: true,
        },

        phone: {
            type: String,
            required: true,
        },

        clinicName: {
            type: String,
            trim: true,
        },

        address: {
            type: String,
        },

        rates: [
            {
                workType: {
                    type: String,
                    required: true,
                },
                amount: {
                    type: Number,
                    required: true,
                    min: 0,
                },
            },
        ],
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Doctor", doctorSchema);