const express = require('express');
const multer = require('multer');
const { upload, list, download, versions, share } = require('../controllers/fileController');
const router = express.Router();
const uploadMiddleware = multer();

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).send('Unauthorized');
  try {
    req.user = require('jsonwebtoken').verify(token, require('../config').jwtSecret);
    next();
  } catch {
    res.status(401).send('Invalid token');
  }
};

router.post('/upload', authMiddleware, uploadMiddleware.single('file'), upload);
router.get('/', authMiddleware, list);
router.get('/:id/download', authMiddleware, download);
router.get('/:id/versions', authMiddleware, versions);
router.post('/:id/share', authMiddleware, share);

module.exports = router;