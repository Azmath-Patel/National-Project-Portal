const mongoose = require('mongoose');

const personSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String, required: true },
  contactNumber: { type: Number },
  alternateContactNumber: { type: Number },
  permanentAddress: { type: String, required: true },
  currentLocation: { type: String, required: true },
  geoCoordinates: { type: String },
  medicalConditions: { type: String },
  injuries: { type: String },
  medicationNeeds: { type: String },
  numberOfFamilyMembers: { type: Number },
  familyDetails: { type: String },
  missingFamilyDetails: { type: String },
  foodRequirements: { type: String },
  clothingSizes: { type: String }
});

const Person = mongoose.model('Person', personSchema);

module.exports = Person;
