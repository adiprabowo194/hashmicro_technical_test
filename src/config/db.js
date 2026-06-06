const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(
            process.env.DB_URI,
            {
                dbName: "hashmicro_technicalTest"
            }
        );
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

module.exports = connectDB;