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

module.exports={createnewblog}