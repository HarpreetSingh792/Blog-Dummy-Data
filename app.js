const express = require("express");
const mongoose = require("mongoose");
const app = express();
app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded request bodies -> it will read it as a URL
require("dotenv").config();
const cors = require('cors');
app.use(cors());

try {
    mongoose.connect(
        process.env.DB_URL,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    );
} catch (err) {
    console.log(err)
}

const db = mongoose.connection;
db.on('error', (err) => console.error(err));
db.once('open', () => console.error("Connected to Database"));

app.get("/", async (req, res) => {
    res.send("Hello World");
})

const Blog = require("./models/story");
app.post("/story", async (req, res) => {
    try {
        const addingStory = new Blog(req.body)
        console.log(req.body);
        const insertData = await addingStory.save();
        res.status(201).send(insertData);
    } catch (e) {
        res.status(400).json({
            message: e.message
        });
    }
})

//get individual data
app.get("/story", async (req, res) => {
    try {
        const getData = await Blog.find({});
        res.send(getData);
    } catch (e) {
        res.status(400).send(e);
    }
})

//to get and update data of individual data
app.patch("/story/:index", async (req, res) => {
    try {
        const index = req.params.index;
        const getSingleData = await Blog.findByIdAndUpdate(index, req.body, {
            new: true
        });
        res.send(getData);
    } catch (e) {
        res.status(500).send(e);
    }
})

//to delete request 
app.delete("/story/:index", async (req, res) => {
    try {
        const index = req.params.index;
        const getSingleData = await Blog.findByIdAndDelete(index);
        res.send(getData);
    } catch (e) {
        res.status(500).send(e);
    }
})

const port = process.env.PORT || 5000;   //dynamic allocation of port number on different servers or self declare a port 3000
app.listen(port, () => {
    console.log(`Connection is live at port no. ${port}`);
})