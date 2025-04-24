import express from 'express';
import ServiceProvider from '../models/serviceProvider.model.js';
import path from 'path';
import multer from 'multer';

const uploadRouter = express.Router();

const __dirname = path.resolve();

// Set up storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) { cb(null, 'uploads/') },
    filename: function (req, file, cb) {
        const ext = path.extname(file.originalname);
        cb(null, Date.now() + ext);
    },
});

const upload = multer({ storage });

uploadRouter.post('/upload', upload.single('image'), async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ success: false, message: 'No file uploaded' });
    }

    res.status(200).json({
        success: true,
        message: 'Image uploaded!',
        filePath: `uploads/${req.file.filename}`
    })
});

export default uploadRouter;