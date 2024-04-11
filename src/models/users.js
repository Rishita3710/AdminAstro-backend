const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    loginId: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    }
});


const User = new mongoose.model("Users", userSchema);
module.exports = User;
