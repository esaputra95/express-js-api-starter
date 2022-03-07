const express = require("express");
const router = express.Router();
const upload = require("./../../controllers/UploadFile")
const {imageUpload} = require('./../../helper/uploadImage')
router.post("/", imageUpload.single('image'),  upload.uploadImage)

module.exports = router;