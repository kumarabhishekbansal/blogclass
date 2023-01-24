const blogrouter=require("express").Router();
const {isAuthenticated}=require("../helper/utils");

const {createnewblog}=require("./controllers");

blogrouter.post("/createblog",isAuthenticated,createnewblog);

module.exports={blogrouter};