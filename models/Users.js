const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

// We define schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true,
        maxlength: [50, 'Name cannot be longer than 50 characters']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: [true, 'Email is already registered'],
        lowercase: true,
        trim: true,
        match: [
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            'Please, enter a valid email address'
        ]
    },
    password: {
        type: String,
        required: [true, 'Password required'],
        minlength: [6, 'Password must have six or more characters']
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    isActive: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Middleware for encrypt password with bcrypt
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next(); // If the password has not been modified, continue
    try {
        const salt = await bcrypt.genSalt(10); // Generate 10 rounds salt
        this.password = await bcrypt.hash(this.password, salt); //Encrypt password
        next();
    } catch (error) {
        next(error);
    }
});

// Method for compare passwords
userSchema.methods.comparePassword = async function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

// Create model
const User = mongoose.model('User', userSchema);

module.exports = User;