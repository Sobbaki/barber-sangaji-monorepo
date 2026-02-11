const express = require('express');
const multer = require('multer');
const { requireAuth } = require('../lib/auth');
const { createWithUpload, list, getById, update, remove } = require('../controller/testimonialController');

const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 20 * 1024 * 1024 } 
});

router.get('/', list);
router.get('/:id', getById);

router.post('/', requireAuth, upload.single('file'), createWithUpload);

router.put('/:id', requireAuth, upload.single('file'), update);
router.delete('/:id', requireAuth, remove);

module.exports = router;
