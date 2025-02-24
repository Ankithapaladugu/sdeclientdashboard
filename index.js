const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');

const app = express();

// Middleware
app.use(cors());  // Add CORS middleware before other middleware
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);

// Database connection
mongoose.connect('mongodb://localhost:27017/U')
.then(() => console.log('Database connected successfully'))
.catch((err) => console.log('Database connection error:', err));

// Error handling middleware
app.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        status: 'error',
        message: err.message
    });
});

const PORT =  4000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
