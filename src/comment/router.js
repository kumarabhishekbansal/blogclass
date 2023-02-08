const commentrouter=require("express").Router();
const {isAuthenticated}=require("../helper/utils");

const {Commentdes,deleteparticularcomment,updateparticularcomment,usercommentdatas,likecomment}=require("./controllers");

commentrouter.post("/createcomment",isAuthenticated,Commentdes);
commentrouter.delete("/deletecomment",isAuthenticated,deleteparticularcomment);
commentrouter.patch("/updatecomment",isAuthenticated,updateparticularcomment);
commentrouter.get("/getallcomments",isAuthenticated,usercommentdatas);
commentrouter.post("/likecomment",isAuthenticated,likecomment);
module.exports={commentrouter};