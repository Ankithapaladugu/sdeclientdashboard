const User = require('../models/userModel');

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if email and password are provided
        if (!email || !password) {
            return res.status(400).json({
                status: 'fail',
                message: 'Please provide email and password'
            });
        }

        // Find user by email
        const user = await User.findOne({ email });

        // Check if user exists and password matches
        if (!user || user.password !== password) {
            return res.status(401).json({
                status: 'fail',
                message: 'Invalid email or password'
            });
        }

        // Send success response with user data (excluding password)
        const userResponse = {
            id: user._id,
            email: user.email,
            name: user.name,
            company: user.company,
            service: user.service,
            googleDriveLink: user.googleDriveLink
        };

        res.status(200).json({
            status: 'success',
            data: userResponse
        });

    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Internal server error'
        });
    }
};

exports.createUser = async (req, res) => {
    try {
        const newUser = await User.create(req.body);

        // Remove password from response
        const userResponse = {
            id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            company: newUser.company,
            service: newUser.service,
            googleDriveLink: newUser.googleDriveLink,
            smartsheetLink: newUser.smartsheetLink
        };

        res.status(201).json({
            status: 'success',
            data: userResponse
        });

    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({
                status: 'fail',
                message: 'Email already exists'
            });
        }
        res.status(400).json({
            status: 'fail',
            message: error.message
        });
    }
};

exports.getDriveLink = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({
                status: 'fail',
                message: 'User not found'
            });
        }

        res.status(200).json({
            status: 'success',
            data: {
                googleDriveLink: user.googleDriveLink
            }
        });

    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Error fetching drive link'
        });
    }
};
// ... existing code ...

exports.getUserDetails = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id).select('name email company service');

        if (!user) {
            return res.status(404).json({
                status: 'fail',
                message: 'User not found'
            });
        }

        res.status(200).json({
            status: 'success',
            data: {
                name: user.name,
                email: user.email,
                company: user.company,
                service: user.service
            }
        });

    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Error fetching user details'
        });
    }
};
exports.getSmartsheetLink = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({
                status: 'fail',
                message: 'User not found'
            });
        }

        res.status(200).json({
            status: 'success',
            data: {
                smartsheetLink: user.smartsheetLink
            }
        });

    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Error fetching smartsheet link'
        });
    }
};