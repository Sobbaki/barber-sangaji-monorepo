const express = require('express');
const multer = require('multer');
const { requireAuth } = require('../lib/auth');
const controller = require('../controller/contentController');

const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 500 * 1024 * 1024 }, // 500MB untuk video
});

// Konfigurasi untuk menerima file dan thumbnail
const uploadFields = upload.fields([
  { name: 'file', maxCount: 1 },
  { name: 'thumbnail', maxCount: 1 }
]);

router.get('/', controller.list);
router.get('/:id', controller.getById);

router.post('/', requireAuth, uploadFields, controller.createWithUpload);

router.put('/:id', requireAuth, uploadFields, controller.update);
router.delete('/:id', requireAuth, controller.remove);

module.exports = router;

