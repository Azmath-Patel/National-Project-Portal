const mongoose = require("mongoose");

// Define the schema for contact messages
const contactSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true, // Message content must be provided
  },
  email: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now, // Automatically set the creation date
  },
});

// Create the Contact model based on the schema
const Contact = mongoose.model("Contact", contactSchema);

// Export the model so it can be used in other files
module.exports = Contact;
