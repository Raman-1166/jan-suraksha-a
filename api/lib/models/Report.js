const mongoose = require('mongoose');

const ReportSchema = new mongoose.Schema({
    imageUrl: { type: String, required: true },
    description: { type: String, required: true },
    location: {
        latitude: { type: Number, default: 0 },
        longitude: { type: Number, default: 0 },
        address: { type: String, default: 'Unknown' }
    },
    category: { type: String, required: true },
    severity: { type: String, required: true },
    aiGuidance: {
        immediate: [String],
        community: [String],
        official: [String]
    },
    status: { type: String, default: 'Submitted' },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.models.Report || mongoose.model('Report', ReportSchema);
