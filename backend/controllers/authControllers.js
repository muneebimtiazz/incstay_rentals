import User from '../models/User.js';
import jwt from 'jsonwebtoken';

const handleError=(err)=>{
    console.log(err.code,err.message);
    // console.log(err);
    let errors={Email:'',Password:''};

    if(err.code===11000){
        errors.Email='This email is already registered. Sign in?';
        return errors;
    }

    if(err.message.includes('Password is incorrect')){
        errors.Password='Log in with Google or reset password with "Reset password".'
        return errors
    }
    if(err.message.includes('Email is not found')){
        errors.Email='Log in with Google or reset password with "Reset password".     '
        return errors
    }

    if(err.message.includes('User validation failed')){
        
        // err.errors.path
        // err.errors.Email

        Object.values(err.errors).forEach(({properties})=>{
            errors[properties.path]=properties.message;
        })
        return errors
    }
 
}


// creating a jwt token
const expirydate= 3*24*60*60;  //should be global
const createToken=(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn: expirydate
    })
}

export const register=async (req,res)=>{
    const { Email, Password, fname, lname  } = req.body;
try {
    const abc = await User.create({Email, Password, fname, lname});
    // sending jwt to that user 
    const token=createToken(abc._id);
    res.cookie('jwt',token,{maxAge:expirydate*1000,httpOnly: true})
    res.status(201).json({id:abc._id});
} catch (err) {
    // console.log(err);
    const error= handleError(err);
    // res.status(400).json({error});
    res.status(400).json({ message: Object.values(error).join(" ") });

}
}

export const login=async (req,res)=>{
    let {Email,Password}=req.body;

    try{
        //self create a login method in user model
        const abc =await User.login(Email,Password);
        console.log(abc)// user correct return
        const token=createToken(abc._id);
        res.cookie('jwt',token,{maxAge:expirydate*1000,httpOnly: true,secure:true,sameSite:'None'});
        // error facing
        // secure: true,        // IMPORTANT for Railway/Vercel production
        // sameSite: 'None',    // REQUIRED for cross-origin cookie sharing
        res.status(201).json({id:abc._id})

    }
    catch (err){
        const error= handleError(err); //Email is not found , Password is incorrect
        res.status(400).json({ message: Object.values(error).join(" ") });
 
    }
}

export const logout = (req, res) => {
  res.cookie('jwt', '', { maxAge: 1 });
  res.status(200).json({ message: 'Successfully logged out' });
};
