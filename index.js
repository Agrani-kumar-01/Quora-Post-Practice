const express = require("express")
const path = require("path")
const {v4:uuidv4} = require('uuid')
const methodOverride = require("method-override")

const app = express()

app.set("view engine","ejs")
app.use(express.urlencoded({extended : true}))
app.use(express.static(path.join(__dirname,"public")))
app.use(methodOverride("_method"))

let posts = [
    {
        id : uuidv4(),
        username : "agranikumar",
        content : "I love coding"
    },
    {
        id : uuidv4(),
        username : "nikhilsingh",
        content : "Hardwork is important to achive success"
    },
    {
        id : uuidv4(),
        username : "rahulkumar",
        content : "I got selected for my first interview"
    }
]



app.get("/posts",(req,res)=>{
    // res.send("server working well")
    res.render("REST.ejs",{posts})
})

app.get("/posts/new",(req,res)=>{
    res.render("REST2.ejs")
})

app.post("/posts",(req,res)=>{
    console.log(req.body);
    let id = uuidv4()
    let {username,content} = req.body
    posts.push({id,username,content})
    res.redirect("/posts")
    console.log(posts);
})

app.get("/posts/:id",(req,res)=>{
    let {id} = req.params
    let post = posts.find((p) => id === p.id)
    res.render("RESTshow.ejs",{post})
})

app.get("/posts/:id/edit",(req,res)=>{
    let {id} = req.params
    let post = posts.find((p) => id === p.id)
    res.render("RESTedit.ejs",{post})
})

app.patch("/posts/:id",(req,res)=>{
    let {id} = req.params
    let newContent = req.body.content
    let post = posts.find((p) => id === p.id)
    post.content = newContent
    res.redirect("/posts")  
})

app.delete("/posts/:id",(req,res)=>{
    let {id} = req.params
    posts = posts.filter((p)=> id !== p.id)
    console.log(post);
    res.redirect("/posts")
})

app.listen(8080,()=>{
    console.log("app is listening on port no 8080");
})