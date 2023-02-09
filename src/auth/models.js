const mongoose=require("mongoose");
const uuid=require("uuid");
const cryptojs=require("crypto-js");
const userschema=new mongoose.Schema({
        username:{
            type:String,
            unique:true,
            trim:true,
        },
        name:{
            type:String
        },
        ency_password:{
            type:String
        },
        salt:{
            type:String
        },
        email:{
            type:String,
            unique:true,
        },
},{
    timestamps:true
})


userschema.virtual("password").set(function(planpassword){
    this.salt=uuid.v4();
    this.ency_password=this.securePassword(planpassword);
})

userschema.methods={
    authenticate: function (password) {
        // console.log(this.ency_password);
        // console.log(password);
        // console.log(this.salt);
        // console.log(this.securePassword(password));
        return this.ency_password === this.securePassword(password);
      },
    securePassword:function(planpassword){
        return cryptojs.SHA256(planpassword,this.salt).toString();
    }
}


const User=mongoose.model("User",userschema);

module.exports={User};
