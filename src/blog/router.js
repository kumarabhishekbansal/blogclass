const blogrouter=require("express").Router();
const {isAuthenticated}=require("../helper/utils");

const {createnewblog,updateblogs,getuserblog,getallblogs,deleteblog,getdatabyblogid}=require("./controllers");

blogrouter.post("/createblog",isAuthenticated,createnewblog);
blogrouter.patch("/updateblog",isAuthenticated,updateblogs);
blogrouter.get("/getblog",isAuthenticated,getuserblog);
blogrouter.get("/getallblog",getallblogs);
blogrouter.delete("/deleteblog",isAuthenticated,deleteblog);
blogrouter.get("/getblogbyid",getdatabyblogid);
module.exports={blogrouter};