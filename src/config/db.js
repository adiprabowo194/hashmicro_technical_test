const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        const conn = mongoose.connection.once("open", () => {
            console.log("MongoDB connected");
        }).once("error", (error) => {
            console.log(error);
            process.exit(1);
        })

        await mongoose.connect(process.env.DB_URI);
    } catch (error) {
        console.log("Database connection failed", error);

        process.exit(1);
    }
};

module.exports = connectDB;