const bcrypt = require("bcrypt");
require("dotenv").config();

const hassPassword = async (passwordToHash, saltRounds) => {
    try {
        const hashedPassword = await bcrypt.hash(passwordToHash, saltRounds);
        return hashedPassword;
    } catch (err) {
        throw err;
    }
};

module.exports = hassPassword;
