const mongoose = require("mongoose");
const blogSchema = new mongoose.Schema({
    index:{
        type:Number,
        required: true,
        unique: true
    },
    headline:{
        type:String,
        required: true,
        trim: true
    },
    description:{
        type:String,
        required: true,
        trim: true
    },
    date:{
        type:String,
        required: true,
        unique: false
    }
})

const Blog = new mongoose.model("Blog", blogSchema);
module.exports = Blog;