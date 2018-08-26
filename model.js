const mongoose = require("mongoose");

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/articles";

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true
})

const Schema = mongoose.Schema;
const articleSchema = new Schema({
    title: {
        type: String,
        required: false,
    },
    author: {
        type: String,
        required: false,
    },
    date: {
        type: String,
        required: false,
    },
    articleHTML: {
        type: String,
        required: false,
    },
    saved: {
        type: Boolean,
        default: false
    }
});

const Article = mongoose.model("Article", articleSchema);

module.exports = Article