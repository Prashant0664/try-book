const mongoose = require("mongoose");

const { ObjectId } = mongoose.Schema;

const metadata = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        link: {
            type: String,
            default: "",
        },
        coverimg: {
            type: String,
            default: "",
        },
        bookid: {
            type: String,
            // ref: "Book",
            // required: true
        },
        views: {
            type: Number,
            default: 0
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Metadata", metadata);


// manga names and add
