import mongoose from "mongoose";
// auth imports
import pkg from 'validator';
const {isEmail} = pkg;
import bcrypt from 'bcrypt'

const userSchema=new mongoose.Schema(
    {   
        pfp:String,
        fname:String,
        lname:String,

        Email: {
        type: String,
        required:[true,'please enter your email'],
        unique:true,
        lowercase:true,
        validate:[isEmail,'please enter valid email']},

        Password: {
        type: String,
        required:[true,'please enter your password'],
        minlength:[6,'password must be of length 6 characters']},

        aboutme:String,
        fb:String,
        twitter:String,
        instagram:String,
        dob:String,
        location:String,
        mobileNumber:String,
        
        createdAt:{
            type:Date,
            default:Date.now
        }
    },{timestamps:true}
)

// auth
//bcrypt salt generation and save to db
userSchema.pre('save',async function(next){
    // Only hash if password is modified
    if (!this.isModified('Password')) return next();
    
    const salt=await bcrypt.genSalt();
    this.Password=await bcrypt.hash(this.Password,salt);
    next();
})

userSchema.statics.login=async function(Email,Password){
    const user=await this.findOne({Email})
    if(user){
        let auth=await bcrypt.compare(Password,user.Password)
        if(auth){
            return (user);
        }
        throw Error('Password is incorrect')
    }
    throw Error('Email is not found')
}
export default mongoose.model("User",userSchema);