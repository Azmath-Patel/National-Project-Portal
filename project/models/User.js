const mongoose = require("mongoose");

const usersSchema =  mongoose.Schema({
  email: { 
    type: String, 
    required: true, 
    unique: true 
  },
  password: { 
    type: String, 
    required: true 
  },
});


const User = mongoose.model("User", usersSchema);

// Export model and functions
module.exports = User;