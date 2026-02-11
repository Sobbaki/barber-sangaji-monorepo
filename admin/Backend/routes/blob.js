const express = require('express');
const multer = require('multer');
const { requireAuth } = require('../lib/auth');
const { uploadFile } = require('../controller/blobController');

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 50 * 1024 * 1024 } 
});

const router = express.Router();

router.post('/upload', requireAuth, upload.single('file'), uploadFile);

module.exports = router;
