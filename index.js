// Express Allows to set up middlewares to respond to HTTP Requests .
const express=require("express");
// mongoose is a mongo db library in which we can create,read,update and delete data by using some nosql queries
const mongoose=require("mongoose");
// CORS stands for Cross-Origin Resource Sharing . It allows us to relax the security applied to an API.
const cors=require("cors");
// It is responsible for parsing the incoming request bodies in a middleware before you handle it. 
const bodyparser=require("body-parser");

const {authrouter}=require("./src/auth/router");

const {blogrouter}=require("./src/blog/router");

const {commentrouter}=require("./src/comment/router");

const app=express();


// middleware

app.use(cors());
app.use(bodyparser.json());
app.use("/auth",authrouter);
app.use("/blog",blogrouter);
app.use("/comment",commentrouter);
// connection with mongo db

mongoose.connect("mongodb+srv://Abhishek:foG2pCKaFlF0yShL@cluster0.76z2f9m.mongodb.net/blogclass?retryWrites=true&w=majority");
mongoose.connection.on("connected",()=>{
    console.log("mongo db connect success");
})

app.get("",(req,res)=>{
    res.sendFile(__dirname+"/index.html");
})

app.listen(4000,()=>{
    console.log("server is starting at port no 4000 node js");
});

