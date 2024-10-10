const mongoose = require("mongoose");

const { ObjectId } = mongoose.Schema;

const Pages = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        pagesid: {
            type:Array,
            default:[],
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

module.exports = mongoose.model("Pages", Pages);
