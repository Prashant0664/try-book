const mongoose = require("mongoose");

const { ObjectId } = mongoose.Schema;

const Book = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        coverimg: {
            type: String,
            default: "",
        },
        bookid: {
            type:Array,
            default:[],
        },
        bookname: {
            type:Array,
            default:[],
        },
        views: {
            type: Number,
            default: 0
        },
        metaid:{
            type:String,
            default:"",
        }
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Book", Book);
