const bcrypt = require("bcrypt");
require("dotenv").config();

const passwordToHash = process.env.ADMIN_PASSWORD; // Your actual password
const saltRounds = 10;

bcrypt.hash(passwordToHash, saltRounds, (err, hash) => {
    if (err) throw err;
    console.log("Hashed Password:", hash);
});
