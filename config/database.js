const mongoose = require("mongoose");

async function connect() {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("Connected to database successfully!");
    } catch (err) {
        console.error("Database connect failed: + ", err);
    }
}   

module.exports = { connect };
