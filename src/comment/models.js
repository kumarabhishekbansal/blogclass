const mongoose=require("mongoose");
const commentSchema=new mongoose.Schema({
    comment:{
        type:String
    },blog_id:{
        type:Schema.Types.ObjectId,
        ref:"Blog"
    },
    user_id:{
        type:Schema.Types.ObjectId,
        ref:"User"
    }
},{
    timestamps:true
})

const Comment=mongoose.model("Comment",commentSchema);

module.exports={Comment};