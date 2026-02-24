const mongoose = require('mongoose');
const Report = require('../models/Report');
const cloudinary = require('../config/cloudinary');
const aiService = require('../services/aiService');

// Helper: check if DB is connected
const isDbConnected = () => mongoose.connection.readyState === 1;

exports.createReport = async (req, res) => {
    try {
        const { description, location } = req.body;

        if (!req.file) {
            return res.status(400).json({ message: 'Image is required' });
        }

        // 1. Upload to Cloudinary (with local fallback)
        let imageUrl = '';
        try {
            if (process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_KEY !== 'undefined') {
                const uploadResult = await cloudinary.uploader.upload(req.file.path, {
                    folder: 'civic_reports',
                });
                imageUrl = uploadResult.secure_url;
            } else {
                throw new Error('Cloudinary credentials missing');
            }
        } catch (cloudinaryError) {
            console.warn('Cloudinary unavailable, using local file:', cloudinaryError.message);
            // Serve the image from the local uploads directory
            const filename = req.file.filename || require('path').basename(req.file.path);
            imageUrl = `http://localhost:${process.env.PORT || 5000}/uploads/${filename}`;
        }

        // 2. Analyze with AI
        const aiAnalysis = await aiService.analyzeIssue(imageUrl, description);

        // 3. Build report object
        const parsedLocation = JSON.parse(location || '{}');
        const reportData = {
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
            status: 'Submitted',
            createdAt: new Date()
        };

        // 4. Save to MongoDB (or skip if disconnected)
        if (isDbConnected()) {
            try {
                const newReport = new Report(reportData);
                await newReport.save();
                return res.status(201).json(newReport);
            } catch (dbError) {
                console.error('Database Save Error:', dbError.message);
            }
        }

        // Fallback: return mock report without saving
        reportData._id = Date.now().toString();
        console.warn('DB not connected — returning report in demo mode');
        res.status(201).json(reportData);
    } catch (error) {
        console.error('Create Report Error:', error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
};

exports.getAllReports = async (req, res) => {
    if (!isDbConnected()) {
        return res.status(200).json([]);
    }
    try {
        const reports = await Report.find().sort({ createdAt: -1 });
        res.status(200).json(reports);
    } catch (error) {
        console.error('Error fetching reports:', error);
        res.status(200).json([]);
    }
};

exports.getReportById = async (req, res) => {
    if (!isDbConnected()) {
        return res.status(404).json({ message: 'Database not available' });
    }
    try {
        const report = await Report.findById(req.params.id);
        if (!report) return res.status(404).json({ message: 'Report not found' });
        res.status(200).json(report);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching report', error: error.message });
    }
};
