const File = require('../models/File');
const User = require('../models/User');
const s3Service = require('../services/s3Service');
const mongoose = require('mongoose');

exports.upload = async (req, res) => {
  const { file } = req;
  if (!file) return res.status(400).send('No file uploaded');

  const key = `${req.user.id}/${Date.now()}_${file.originalname}`;
  await s3Service.uploadFile(file.buffer, key, file.mimetype);

  let dbFile = await File.findOne({ originalName: file.originalname, owner: req.user.id });
  if (!dbFile) dbFile = new File({ originalName: file.originalname, owner: req.user.id, versions: [] });

  dbFile.versions.push({ key, uploadedAt: new Date() });
  await dbFile.save();

  res.json(dbFile);
};

exports.list = async (req, res) => {
  const files = await File.find({ $or: [{ owner: req.user.id }, { sharedWith: req.user.id }] });
  res.json(files);
};

exports.download = async (req, res) => {
  const file = await File.findById(req.params.id);
  if (!file || (!file.owner.equals(req.user.id) && !file.sharedWith.includes(req.user.id))) return res.status(403).send('Forbidden');
  const idx = req.query.version !== undefined ? Number(req.query.version) : file.versions.length - 1;
  const version = file.versions[idx];
  const url = s3Service.getSignedUrl(version.key);
  res.json({ url });
};

exports.versions = async (req, res) => {
  const file = await File.findById(req.params.id);
  if (!file || (!file.owner.equals(req.user.id) && !file.sharedWith.includes(req.user.id))) return res.status(403).send('Forbidden');
  res.json(file.versions);
};

exports.share = async (req, res) => {
  const { email } = req.body;
  const file = await File.findById(req.params.id);
  const user = await User.findOne({ email });
  if (!file || !user) return res.status(404).send('Not found');
  if (!file.owner.equals(req.user.id)) return res.status(403).send('Forbidden');
  if (!file.sharedWith.includes(user._id)) file.sharedWith.push(user._id);
  await file.save();
  res.json(file);
};