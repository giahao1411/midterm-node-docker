const bcrypt = require("bcrypt");
require("dotenv").config();

// const passwordToHash = process.env.ADMIN_PASSWORD; // Your actual password
// const saltRounds = 10;

const hassPassword = async (passwordToHash, saltRounds) => {
    try {
        const hashedPassword = await bcrypt.hash(passwordToHash, saltRounds);
        console.log("Hashed password:", hashedPassword);
        return hashedPassword;
    } catch (err) {
        throw err;
    }
};

module.exports = hassPassword;
