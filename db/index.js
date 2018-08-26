const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const articleSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
    articleHTML: {
        type: String,
        required: true,
    },
    saved: {
        type: Boolean,
        default: false
    }
});

const Article = mongoose.model("Article", articleSchema);

module.exports = Article;