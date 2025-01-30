const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: [true, 'Title is required'],
        trim: true,
        maxlength: [100, 'Title cannot be longer than 100 characters']
    },
    content: {
        type: String,
        required: [true, 'Content is required'],
        trim: true
    },
    isArchived: {
        type: Boolean,
        default: false
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

noteSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

const Note = mongoose.model('Note', noteSchema);

module.exports = Note;
