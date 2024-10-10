const Pages = require("../models/Pages");
const cheerio = require('cheerio');
const Book = require("../models/Book");
const Metadata = require("../models/metadata");
const axios = require("axios");
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');
require('dotenv').config();

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,  // Replace with your Cloudinary Cloud Name
    api_key: process.env.API_KEY,        // Replace with your Cloudinary API Key
    api_secret: process.env.API_SECRET   // Replace with your Cloudinary API Secret
});
exports.fetchmetadata = async (req, res) => {
    try {
        const metadata = await Metadata.find();
        return res.status(201).json({ data: metadata });
    } catch (error) {
        // console.log(error)
        return res.status(500).json({ message: error.message });
    }
}
exports.postmetadata = async (req, res) => {
    try {
        const { link, title } = req.body;
        const datatobeadded = {
            link: link,
            title: title,
            coverimg: "coverimg",
            bookid: "bookid",
        }
        const metadata = await new Metadata(datatobeadded).save();
        const bookdetails = {
            title: title,
            coverimg: "coverimg",
            metaid: metadata._id,
            views: 0,
        }
        const generatebook = await new Book(bookdetails).save();
        return res.status(201).json({ data: "metadata" });
    } catch (error) {
        // console.log(error)
        return res.status(500).json({ message: error.message });
    }
}
async function scrapeImages(url, id, num, flag) {
    try {
        const { data } = await axios.get(url);
        const $ = cheerio.load(data);

        const images = [];
        $('img').each((i, el) => {
            const imgSrc = $(el).attr('src');
            if (imgSrc && imgSrc.startsWith('http')) {
                images.push(imgSrc);
            }
        });

        var arr = []
        const dat = await Book.find({ metaid: id });
        var title=dat[0].title;
        // console.log("STARTING UPLOADING TO CLOUD")
        for (let i = 0; i < images.length; i++) {
            const iurl = await uploadImageToCloudinary(images[i], title);
            arr.push(iurl);
            // break;
        }
        // console.log("UPLOAD FINISHED");
        // console.log("UPLOADING DATA TO MONGODB");
        const newpage = {
            title: dat[0].title + " - " + num,
            pagesid: arr,
            views: 0
        }
        // console.log(newpage);
        // console.log(arr);
        const page = await Pages.create(newpage);
        // console.log(id);
        dat[0].bookid.push(page._id);
        dat[0].bookname.push(newpage.title);
        dat[0].save();
        // console.log("PAGE UPLOADED SUCCESSFULLY");
        return 1;
    } catch (error) {
        // console.error('Error scraping images:');
        return 0;
    }
}

// Upload images directly to Cloudinary
async function uploadImageToCloudinary(imageUrl, title) {
    try {
        const result = await cloudinary.uploader.upload(imageUrl, {
            folder: title, // Optional: specify a folder in Cloudinary
        });
        return result.secure_url;
        // console.log('Uploaded to Cloudinary:', result.secure_url);
    } catch (error) {
        // console.error('Error uploading to Cloudinary:', error);
    }
}
async function scrapehelp(urlpre, urlnum, urlsuff, id, number, flag, stnumber) {
    // const dat = await Book.find({ metaid: id });
    // dat[0].bookid = [];
    // dat[0].bookname = [];
    // dat[0].save();
    // console.log("CACHE CLEARED", number, id);
    for (var i = stnumber; i <= number; i++) {
        // console.log("GENERATING", i);
        s = "";
        s += urlpre;
        s += i;
        s += urlsuff;
        var f=scrapeImages(s, id, i,flag);
        // console.log(s);
        if(f){
            console.log("GENERATED", i);
        }
        else{
            console.log("NOT FOUND", s);
        }
        // console.log("HERE END", i)
    }
    return 1;
}
exports.addchaptergrp = async (req, res) => {
    try {
        const { urlpre, urlnum, urlsuff, number, id, stnumber } = req.body;
        scrapehelp(urlpre, urlnum, urlsuff, id, number, 1, stnumber);
        return res.status(201).json({ data: "metadata" });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: error.message });
    }
}
exports.addchapterone = async (req, res) => {
    try {
        const { urlpre, urlnum, urlsuff, number, id } = req.body;
        // console.log(urlpre, urlnum, urlsuff, id);
        s = "";
        s += urlpre;
        s += urlnum;
        s += urlsuff;
        const f = scrapeImages(s, id, number,0);
        if (!f) {
            return res.status(500).json({ message: "error" });
        }
        return res.status(201).json({ data: "metadata" });
    } catch (error) {
        // console.log(error)
        return res.status(500).json({ message: error.message });
    }
}
exports.fetchbookchapters = async (req, res) => {
    try {
        const { id } = req.body;
        // console.log(id);
        const chapters = await Book.find({ metaid: id });
        // console.log(chapters);
        return res.status(201).json({ data: chapters });
    }
    catch (error) {
        console.log(error)
        return res.status(500).json({ message: error.message });
    }
}
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Upload image to Cloudinary
exports.uploadcoverimg = async (req, res) => {
    try {
        const file = req.file;  // Multer stores the file in req.file
        const id=req.body.id;
        if (!file) {
            return res.status(400).json({ message: 'No file provided' });
        }

        // Upload to Cloudinary
        const dat=await Book.find({metaid:id});
        const dat2=await Metadata.find({_id:id});
        const result = await cloudinary.uploader.upload_stream({ resource_type: "image" }, (error, result) => {
            if (error) {
                console.error(error);
                return res.status(500).json({ message: "Image upload failed" });
            }
            if( dat && dat[0]){
                dat[0].coverimg=result.secure_url;
                dat[0].save();
                
            }
            if(dat2 && dat2[0]){
                dat2[0].coverimg=result.secure_url;
                dat2[0].save();
            }
            return res.status(201).json({ url: result.secure_url });
        }).end(file.buffer);  // Use the file buffer to upload

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message });
    }
};

exports.getallbooks = async (req, res) => {
    try {
        console.log(req.body.id, "LLL");
        const books = await Book.find({metaid:req.body.id});
        return res.status(201).json({ booknames: books[0].bookname, booklinks: books[0].bookid });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: error.message });
    }
}
exports.getallimages=async(req,res)=>{
    try{
        const {id}=req.body;
        const pages=await Pages.find({_id:id});
        return res.status(201).json({data:pages});
    }
    catch(error){
        console.log(error)
        return res.status(500).json({ message: error.message });
    }
}