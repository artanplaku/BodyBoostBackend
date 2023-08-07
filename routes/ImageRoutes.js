const express = require('express');
const multer = require('multer');
const ImageModel = require('../models/imageModel'); 
const router = express.Router();
const checkToken = require('../checkToken');
const fs = require('fs'); 
// Multer setup for memory storage (file will be available as buffer)
const upload = multer();

router.post('/upload', checkToken, upload.single('image'), async (req, res) => {
  try {
    const userId = req.userId;

    const imageData = req.file.buffer.toString('base64');
    //req.file is an object provided by multer when a file is uploaded. It contains several properties related to the uploaded file.
    
    //req.file.buffer is the file content in the form of a buffer. This buffer represents the binary data of the file.
    
    // .toString('base64') is a method to convert this buffer (binary data) into a Base64-encoded string. Base64 encoding is a way to convert binary data into a set of ASCII characters. This makes it possible to embed binary data, like images, directly within text-based formats like JSON.

    const image = new ImageModel({
      imageData: imageData,
      contentType: req.file.mimetype,
      user: userId
      // req.file.mimetype provides the MIME type of the uploaded file. The MIME type is a standard way to describe the type and nature of the file. For images, it can be something like image/jpeg for JPEG images, image/png for PNG images, etc.
    });

    await image.save();

    res.json({ success: true, message: 'Image uploaded!' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/', checkToken, async (req, res) => {
  try {
    const userId = req.userId;
    const images = await ImageModel.find({ user: userId });
    const imagesData = images.map(image => ({
      _id: image._id, 
      dataUrl: `data:${image.contentType};base64,${image.imageData}`
      //  transforming an array of images (from the database) into an array of Data URLs.
    }));
    res.json(imagesData);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ImageRoutes.js
router.delete('/:id', checkToken, async (req, res) => {
  try {
      const imageId = req.params.id;
      await ImageModel.findByIdAndDelete(imageId);
      res.json({ message: "Image deleted successfully." });
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
});


  

module.exports = router;