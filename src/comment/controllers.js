const {Comment}=require("./models");


//Commentdes is used to create blog after passing blog id by query parameter and comment and it takes user id automattically and we can comment to an blog but for this we must have authenticated

const Commentdes=async(req,res)=>{
    try {
        const {user_id,comment}=req.body;
        const blog_id=req.query._id;
        
        const createcomment=await Comment.create({comment,blog_id,user_id});
        createcomment.save();
        if(createcomment)
        {
            return res.status(200).json({
                message:"comment created",
                data:createcomment
            })
        }else{
            return res.status(200).json({
                message:"comment can not be created",
            })
        }

    } catch (error) {
        console.log("error while comment description");
    }
}

//usercommentdatas is used to get all the blogs in which he was commented before

const usercommentdatas=async(req,res)=>{
    try {
        const{user_id}=req.body;
        const alldata=await Comment.find({user_id:user_id});
        if(alldata)
        {
            return res.status(200).json({
                message:"getting all data",
                data:alldata
            })
        }else{
            return res.status(200).json({
                message:"you have not comment to any blogs yet",
            })
        }
    } catch (error) {
        console.log("error while getting user all comments to any blogs");
    }
}

//deleteparticularcomment is used to delete comment and he can delete his own comment not anyother ones else.


const deleteparticularcomment=async(req,res)=>{
    try {
        const {user_id}=req.body;
        const commentid=req.query._id;
        const filter={
            $and:[{user_id:user_id},{_id:commentid}]
        }
        const deletedata=await Comment.findOneAndDelete(filter,{_id:commentid});
        if(deletedata)
        {
            return res.status(200).json({
                message:"comment deleted successfully",
                data:deletedata
            })
        }else{
            return res.status(200).json({
                message:"either you have no right to delete or invalid id",
            })
        }
    } catch (error) {
        console.log("error while deleting the comment");
    }
}

//updateparticularcomment is used to update comment and he can update his own comment not anyother ones else.

const updateparticularcomment=async(req,res)=>{
    try {
        const {user_id}=req.body;
        const commentid=req.query._id;
        const filter={
            $and:[{user_id:user_id},{_id:commentid}]
        }
        const updatedata=await Comment.findOneAndUpdate(filter,req.body,{
            new:true
        });
        if(updatedata)
        {
            return res.status(200).json({
                message:"comment update successfully",
                data:updatedata
            })
        }else{
            return res.status(200).json({
                message:"either you have no right to update or invalid id",
            })
        }
    } catch (error) {
        console.log("error while update the comment");
    }
}


//likecomment is used to like comment it works similar as like button in frontend


const likecomment=async(req,res)=>{
    try {
        const {user_id}=req.body;
        const blog_id=req.query._id;
        const comment="like this comment"
        const createcomment=await Comment.create({comment,blog_id,user_id});
        createcomment.save();
        if(createcomment)
        {
            return res.status(200).json({
                message:"comment created",
                data:createcomment
            })
        }else{
            return res.status(200).json({
                message:"comment can not be created",
            })
        }

    } catch (error) {
        console.log("error while like comment");
    }
}

module.exports={Commentdes,deleteparticularcomment,updateparticularcomment,usercommentdatas,likecomment};