const express = require('express')
const router = express.Router()
const Note = require('../models/Notes')
const authorization = require('../middlewares/authorization')

router.post('/all', authorization, async (req, res) => {
    try {
        const notes = await Note.find({ userId: req.user.id }).sort({ createdAt: -1 })

        res.status(200).json(notes)
    } catch (error) {
        console.error('Error fetching notes:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
})

router.post('/create', authorization, async (req, res) => {
    try {
        const { title, content } = req.body;

        if (!title || !content) {
            return res.status(400).json({ error: 'Title and content are required' });
        }

        const newNote = new Note({
            userId: req.user.id,
            title,
            content
        });

        await newNote.save();

        res.status(201).json({ message: 'Note created successfully', note: newNote });
    } catch (error) {
        console.error('Error creating note:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
})

router.delete('/delete', async (req, res) => {
    try {
        const { id } = req.body
        if (!id) {
            return res.status(400).json({ error: 'Id of note required' });
        }

        const result = await Note.findByIdAndDelete(id);

        if (!result) {
            return res.status(404).json({ error: 'The note could not be founded' });
        }

        res.status(200).json({ message: 'Note deleted correctly' })
    } catch (e) {
        console.error('Error:', e);
        res.status(500).json({ error: 'Server internal error' });
    }
})

module.exports = router