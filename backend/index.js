const port = process.env.PORT || 3001;
const dotenv = require("dotenv").config();
const app = require('express')();
const express = require('express');
// process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
const cors = require("cors");
const mongoose = require('mongoose');
const Metarouter=require('./routes/post');
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

const allowedOrigins = [
  process.env.NODE_ENV === 'production' ? process.env.BACK : "http://localhost:3001", 
  process.env.NODE_ENV === 'production' ? process.env.FRONT : "http://localhost:3000",
  "https://readmangaonline-free.vercel.app"  // Always allow this domain
];
app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: "GET,POST,PUT,DELETE",
    credentials: true,  // Allow cookies and other credentials
  })
);
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  next();
});
mongoose.connect(process.env.MONGO)
app.use("/",Metarouter);
// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
