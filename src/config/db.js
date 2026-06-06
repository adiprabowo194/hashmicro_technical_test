const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(
            process.env.DB_URI,
            {
                dbName: "hashmicro_technicalTest"
            }
        );

        console.log(
            "Database:",
            conn.connection.db.databaseName
        );

        console.log(
            "MongoDB Connected:",
            conn.connection.host
        );

    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

module.exports = connectDB;