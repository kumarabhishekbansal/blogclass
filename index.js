const express=require("express");
const mongoose=require("mongoose");
const cors=require("cors");
const bodyparser=require("body-parser");
const {authrouter}=require("./src/auth/router");
const {blogrouter}=require("./src/blog/router");
const app=express();


// middleware

app.use(cors());
app.use(bodyparser.json());
app.use("/auth",authrouter);
app.use("/blog",blogrouter);
// connection with mongo db

mongoose.connect("mongodb+srv://Abhishek:foG2pCKaFlF0yShL@cluster0.76z2f9m.mongodb.net/blogclass?retryWrites=true&w=majority");
mongoose.connection.on("connected",()=>{
    console.log("mongo db connect success");
})

app.listen(4000,()=>{
    console.log("server is starting at port no 4000 node js");
});

