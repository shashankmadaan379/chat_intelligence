const mongoose=require('mongoose');
const bcrypt=require('bcryptjs');
const JWT=require('jsonwebtoken');
const cookie=require('cookie');

const userSchema=mongoose.Schema({
   userName:{
    type:String,
    required:[true,"Username is required"]
   },
   email:{
    type:String,
    required:[true,"Email is required"],
    unique:true,
   },
   password:{
    type:String,
    required:[true,"Password is required"],
    minLength:[6,"Password Length shouls be 6 characters long"]

   },
   customerId:{
    type:String,
    default:"",
   },
   subscription:{
    type:String,
    default:"",
   }
})


//hashed password
userSchema.pre('save', async function(next){
    if(!this.isModified('password')){
        next();
    }
    const salt=await bcrypt.genSalt(10);
    this.password=await bcrypt.hash(this.password,salt);
    next();
})


//match password
userSchema.methods.matchPassword=async function(password){
    return await bcrypt.compare(password,this.password);
}


//Sign Token
userSchema.methods.getSignedToken=async function(res){
     const accessToken=JWT.sign({id:this._id},process.env.JWT_ACCESS_SECRET,{expiresIn:process.env.JWT_ACCESS_EXPIRESIN});
     const refreshToken=JWT.sign({id:this._id},process.env.JWT_REFRESH_TOKEN,{expiresIn:process.env.JWT_REFRESH_EXPIRESIN});
     res.cookie("refreshToken",`${refreshToken}`,{maxAge:86400 * 7000,httpOnly:true})
}

const User=mongoose.model('User',userSchema);
module.exports=User;