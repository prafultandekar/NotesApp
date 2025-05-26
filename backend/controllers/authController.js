const User = require("../models/User");

const jwt = require('jsonwebtoken');

const register = async(req ,res)=>{
    const {name , email,password} = req.body;
    console.log("name" , name) 
    try{
      const existingUser = await User.findOne({email});
      if(existingUser) return res.status(400).json({message:"User Already exits"})

        const newUser = new User({name , email,password});
         await newUser.save();
         res.status(201).json({message:"User registerd succefully"})


    }
    catch(err){
       res.status(500).json({message:" Error in registration", error:err})
    }
}

// login 

const login =async(req, res)=>{
   const {email,password} = req.body;
   console.log('Login email received:', email); // ✅ ADD THIS LINE
   console.log('Login email rece:', password);
  try{

    const user = await User.findOne({email})
    if(!user) return res.status(404).json({message:"User not found"})
  
if(user.password !== password){
 return res.status(400).json({message:"invalied credential"})
}
const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
console.log("JWT_SECRET:", process.env.JWT_SECRET); // ✅ Check if it's undefined


console.log("Generated Token:", token); // ✅ See if token is properly created
res.status(200).json({token,user:{id:user._id,name:user.name,email:user.email}})

  }
  catch(err){
    console.error("Login error:", err);
    res.status(500).json({message:"error in login", error: err.message});
  }
  
}

module.exports= {register,login}