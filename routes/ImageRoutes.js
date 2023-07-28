const express = require('express');
const multer = require('multer');
const ImageModel = require('../models/imageModel'); 
const router = express.Router();
const checkToken = require('../checkToken');
const fs = require('fs'); 

const dir = './uploads';
if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now())
  }
})

const upload = multer({ storage: storage })

router.post('/upload', checkToken, upload.single('image'), async (req, res) => {
  const userId = req.userId; 
  const imageUrl = `/uploads/${req.file.filename}`;

  const image = new ImageModel({
    imageUrl: imageUrl,
    user: userId
  });

  await image.save();

  res.json({ imageUrl: imageUrl });
});

router.get('/', checkToken, async (req, res) => {
    try {
      const userId = req.userId;
      const images = await ImageModel.find({ user: userId });
      res.json(images);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  

module.exports = router;