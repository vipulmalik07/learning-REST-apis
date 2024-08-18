const express = require("express");
const app = express();
const port = 3000;
const path = require("path");
const { v4: uuidv4 } = require('uuid');
var methodOverride = require('method-override')


//path set
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"))
app.use(express.static(path.join(__dirname, "public")))
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))



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

//apis---->


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


//api for creating a new post
app.post("/posts", (req, res) => {
    let { username, content } = req.body
    let id = uuidv4()
    posts.push({ username, content, id })
    res.redirect("/posts")
})

//api for loading page of  editing the post
app.get('/posts/:id/edit', (req, res) => {
    let { id } = req.params;
    let post = posts.find((p) => id === p.id)
    res.render("edit.ejs", { post })

})

//api for patching the post 

app.patch("/posts/:id", (req, res) => {
    let { id } = req.params;
    let newContent = req.body.content;
    let post = posts.find((p) => id === p.id)
    post.content = newContent
    res.redirect("/posts")

})

//deleting the post
app.delete("/posts/:id", (req, res) => {
    let { id } = req.params
    posts = posts.filter((p) => id !== p.id)
    res.redirect("/posts")
})



//server listining api
app.listen(port, () => {
    console.log(`server is listing on port${port}`)
})