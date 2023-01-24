const authrouter=require("express").Router();

const {register,login,reset,commonlogin}=require("./controllers");

authrouter.post("/register",register);
authrouter.post("/login",commonlogin,login);
authrouter.post("/reset",commonlogin,reset);

module.exports={authrouter};