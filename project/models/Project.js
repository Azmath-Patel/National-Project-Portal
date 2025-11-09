const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    candidate: {
        name: { type: String, required: true },
        role: { type: String, required: true }
    },
    project: {
        title: { type: String, required: true },
        description: { type: String, required: true }
    },
    driveLink: { 
        type: String, 
        required: true,
        validate: {
            validator: function(v) {
                return /^(https?:\/\/)?(www\.)?drive\.google\.com\/[^\s]+$/.test(v);
            },
            message: props => `${props.value} is not a valid Google Drive URL!`
        }
    }
}, {
    timestamps: true 
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;



