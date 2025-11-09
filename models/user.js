const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,  
    unique: true,
  },
});

// ✅ Plugin adds username, hash, salt, and authentication methods
userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);  
