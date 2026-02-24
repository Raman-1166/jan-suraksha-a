const dotenv = require('dotenv');
// Load environment variables early
dotenv.config();

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const connectDB = require('./config/db');
const reportRoutes = require('./routes/reportRoutes');

// Connect to Database
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// Security Middleware
app.use(helmet({
    crossOriginResourcePolicy: false, // Allow images from Cloudinary to display if needed
}));
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Serve uploaded images statically
const path = require('path');
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/reports', reportRoutes);

app.get('/', (req, res) => {
    res.send('Civic Action Intelligence Platform API (Production-Ready MVP)');
});

// Centralized Error Handler
const multer = require('multer');
app.use((err, req, res, next) => {
    console.error('Error:', err.message);
    if (err instanceof multer.MulterError) {
        return res.status(400).json({ message: `Upload error: ${err.message}` });
    }
    if (err.message && err.message.includes('Only images')) {
        return res.status(400).json({ message: err.message });
    }
    res.status(500).json({
        message: err.message || 'Something went wrong!',
        error: process.env.NODE_ENV === 'development' ? err.message : {}
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT} in ${process.env.NODE_ENV} mode`);
});
