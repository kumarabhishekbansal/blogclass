const {Blog}=require("./models");

const createnewblog=async(req,res)=>{
    try {
        const {title,description,user_id}=req.body;
        if(!title || !description || !user_id)
        {
            return res.status(422).json({
                message:"please filled all details"
            })
        }

        const createnew=await(await Blog.create({title,description,user_id})).populate("user_id");
        // const createnew=await Blog.create({title,description,user_id});
        await createnew.save();
        if(createnew)
        {
            return res.status(200).json({
                message:"blog created",
                data:createnew
            })
        }else{
            return res.status(422).json({
                message:"blog can not be created"
            })
        }

    } catch (error) {
        console.log("error in creating a blog");
        console.log(error.message);
    }
}

const getuserblog=async(req,res)=>{
    try {
        const user_id=req.body.user_id;
        const datafetch=await Blog.find({user_id:user_id});
        if(datafetch)
        {
            return res.status(200).json({
                message:"data updated ",
                data:datafetch,
            })
        }else{
            return res.status(200).json({
                message:"data empty",
            })
        }

    } catch (error) {
        console.log("error while updating the blog");
    }
}

const getallblogs=async(req,res)=>{
    try {
        const allblog=await Blog.find({});
        if(allblog)
        {
            return res.status(200).json({
                message:"get all blogs ",
                data:allblog,
            })
        }else{
            return res.status(200).json({
                message:"nothing to show any blog ",

            })
        }
    } catch (error) {
        console.log("error while getting all user blogs data");
    }
}

const updateblogs=async(req,res)=>{
    try {
        const user_id=req.body.user_id;
        const _id=req.query;
        // const datafetch=await Blog.find({user_id:user_id});
        const filter={
            $and:[{user_id:user_id},{_id:_id}]
        }
        const datafetch=await Blog.findOneAndUpdate(filter,req.body,{
            new:true
        })
        if(datafetch)
        {
            return res.status(200).json({
                message:"data updated ",
                data:datafetch,
            })
        }else{
            return res.status(422).json({
                right:"you have no rights to update it or invalid id "
            })
        }

    } catch (error) {
        console.log("error while updating the blog");
    }
}

const deleteblog=async(req,res)=>{
    try {
        const user_id=req.body.user_id;
        const _id=req.query._id;
        const filter={
            $and:[{user_id:user_id},{_id:_id}]
        }
        const deleteblogdata=await Blog.findOneAndDelete(filter,{_id:_id});
        if(deleteblogdata)
        {
            return res.status(200).json({
                message:"data deleted ",
                data:deleteblogdata,
            })
        }else{
            return res.status(422).json({
                right:"you have no rights to delete it or invalid id "
            })
        }
    } catch (error) {
        console.log("error while deleting the blog");
    }
}

const getdatabyblogid=async(req,res)=>{
    try {
        const _id=req.query;
        const blogfind=await Blog.findOne({_id:_id});
        if(blogfind)
        {
            return res.status(200).json({
                message:"your blog which is find by blog id :",
                data:blogfind
            })
        }else{
            return res.status(422).json({
                message:"either blog deleted or invalid id",
            })
        }
    } catch (error) {
        console.log("error while getting data by blog id");
    }
}

module.exports={createnewblog,updateblogs,getuserblog,getallblogs,deleteblog,getdatabyblogid}