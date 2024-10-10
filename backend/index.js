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

app.use(
  cors({
    origin: [process.env.NODE_ENV === 'production'?process.env.FRONT:"http://localhost:3001", process.env.NODE_ENV === 'production'?process.env.BACK:"http://localhost:3000"],
    // origin: [keys.REACT_APP_BACKEND_URL, keys.REACT_APP_FRONTEND_URL],
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  next();
});
mongoose.connect(MONGO_URI)
app.use("/",Metarouter);
// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
