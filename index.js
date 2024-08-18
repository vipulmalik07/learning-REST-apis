const express = require("express");
const app = express();
const port = 3000;
const path = require("path");
const { v4: uuidv4 } = require('uuid');

//path set
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"))
app.use(express.static(path.join(__dirname, "public")))



let posts = [
    {
        id: uuidv4(),
        username: "vipul malik",
        content: "i love coding"

    },
    {
        id: uuidv4(),
        username: "shivam trar",
        content: "i love chating"

    },
    {
        id: uuidv4(),
        username: "rajat dixit",
        content: "i love copying"

    },
]

//api


//api for viewing all posts
app.get("/posts", (req, res) => {
    res.render("index.ejs", { posts })
})


//api for creating new post -newPage
app.get("/posts/new", (req, res) => {
    res.render("new.ejs")
})

//api for displaying post in details
app.get("/posts/:id", (req, res) => {
    let { id } = req.params
    let post = posts.find((p) => id === p.id)
    res.render("show.ejs", { post })
})






//server listining api
app.listen(port, () => {
    console.log(`server is listing on port${port}`)
})