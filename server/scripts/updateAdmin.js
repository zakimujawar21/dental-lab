require("dotenv").config();

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Admin = require("../models/Admin");

const updateAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        const admin = await Admin.findOne({});

        if (!admin) {
            console.log("No admin found in database!");
            return;
        }

        admin.name = process.env.ADMIN_NAME;
        admin.email = process.env.ADMIN_EMAIL;
        admin.password = await bcrypt.hash(
            process.env.ADMIN_PASSWORD,
            10
        );

        await admin.save();

        console.log("Admin updated successfully!");
        console.log("Updated email:", admin.email);

    } catch (error) {
        console.error("Error:", error.message);
    } finally {
        await mongoose.disconnect();
    }
};

updateAdmin();