const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });
const { fetchmetadata, deletepage, increaseviewmanga, getallimages,getonlycimg, getallbooks, uploadcoverimg, postmetadata, fetchbookchapters, addchapterone, addchaptergrp } = require("../Controllers/post")
router.get("/metadata", fetchmetadata)
router.post("/addmetadata", postmetadata)
router.post("/fetchbookchapters", fetchbookchapters)
router.post("/addchapterone", addchapterone)
router.post("/addchaptergrp", addchaptergrp)
router.post("/uploadcoverimg", upload.single('image'), uploadcoverimg)
router.post("/getallbooks", getallbooks)
router.post("/getonlycimg", getonlycimg)
router.post("/getallimages", getallimages)
router.post("/deletepage", deletepage)
router.post("/increaseviewmanga", increaseviewmanga)

module.exports = router;