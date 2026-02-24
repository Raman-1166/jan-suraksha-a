const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('MongoDB Atlas connected successfully');
    } catch (err) {
        console.error('MongoDB connection error:', err.message);
        console.warn('Server will continue running without database connection (for demo)');
    }
};

module.exports = connectDB;
