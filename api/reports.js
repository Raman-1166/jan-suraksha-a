require('dotenv').config();
const connectDB = require('./lib/db');
const Report = require('./lib/models/Report');
const aiService = require('./lib/aiService');
const cloudinary = require('./lib/cloudinary');
const formidable = require('formidable');
const fs = require('fs');

module.exports.config = {
    api: {
        bodyParser: false,
    },
};

module.exports = async function handler(req, res) {
    await connectDB();

    const { method } = req;

    switch (method) {
        case 'GET':
            try {
                const { id } = req.query;
                if (id) {
                    const report = await Report.findById(id);
                    if (!report) return res.status(404).json({ message: 'Report not found' });
                    return res.status(200).json(report);
                }
                const reports = await Report.find().sort({ createdAt: -1 });
                res.status(200).json(reports);
            } catch (error) {
                res.status(500).json({ message: 'Error fetching reports', error: error.message });
            }
            break;

        case 'POST':
            const form = formidable();
            form.parse(req, async (err, fields, files) => {
                if (err) return res.status(500).json({ message: 'Form parsing error' });

                try {
                    const description = fields.description[0];
                    const location = fields.location[0];
                    const imageFile = files.image[0];

                    if (!imageFile) return res.status(400).json({ message: 'Image is required' });

                    // Upload to Cloudinary
                    const uploadResult = await cloudinary.uploader.upload(imageFile.filepath, {
                        folder: 'civic_reports',
                    });
                    const imageUrl = uploadResult.secure_url;

                    // AI Analysis
                    const aiAnalysis = await aiService.analyzeIssue(imageUrl, description);

                    // Save to DB
                    const parsedLocation = JSON.parse(location || '{}');
                    const newReport = new Report({
                        imageUrl,
                        description,
                        location: {
                            latitude: parsedLocation.latitude || 0,
                            longitude: parsedLocation.longitude || 0,
                            address: parsedLocation.address || 'Unknown'
                        },
                        category: aiAnalysis.category,
                        severity: aiAnalysis.severity,
                        aiGuidance: aiAnalysis.aiGuidance,
                        status: 'Submitted'
                    });

                    await newReport.save();
                    res.status(201).json(newReport);
                } catch (error) {
                    res.status(500).json({ message: 'Error creating report', error: error.message });
                }
            });
            break;

        default:
            res.setHeader('Allow', ['GET', 'POST']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}
