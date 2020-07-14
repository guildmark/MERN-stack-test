const mongoose = require("mongoose");

var Schema = mongoose.Schema;

var UserSchema = new Schema({
    username: { type: String,   required: true, unique: true,  min: 3, max: 30},
    password: { type: String,  required: true, unique: true, min: 3, max: 100},
    email: { type: String, required: true, default: "", unique: true},
    points: { type: Number, required: false, default: 0 }
});

var User = mongoose.model("User", UserSchema);

module.exports = User;
