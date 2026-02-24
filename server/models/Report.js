const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
    userId: { type: String, default: null }, // Optional for MVP
    imageUrl: { type: String, required: true },
    description: { type: String, required: true },
    category: {
        type: String,
        enum: ['Pollution', 'Tree Cutting', 'Road Damage', 'Waste', 'Other'],
        required: true
    },
    severity: {
        type: String,
        enum: ['Low', 'Medium', 'High'],
        required: true
    },
    aiGuidance: {
        level1: { type: String, required: true },
        level2: { type: String, required: true },
        level3: { type: String, required: true }
    },
    status: {
        type: String,
        enum: ['Submitted', 'In Progress', 'Resolved'],
        default: 'Submitted'
    },
    location: {
        latitude: { type: Number },
        longitude: { type: Number },
        address: { type: String, required: true }
    },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Report', reportSchema);
