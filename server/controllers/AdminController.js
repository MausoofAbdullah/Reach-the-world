import UserModel from "../Models/userModel.js";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const adminRegister = async (req, res) => {

   const {firstname, lastname,username} = req.body
        const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashedPass;
  
    const newAdmin = new UserModel({firstname,lastname,username,password:hashedPass,isAdmin:true,Active:true});
  //  const newAdmin= new UserModel({username,password,...req.body});
   // const {username,password,...rest}=new UserModel(req.body)
    
   //const newAdmin={username,password,...rest}

   
  
    try {
    
      const admin = await newAdmin.save();
  
      const token = jwt.sign(
        {
          firstname: admin.firstname,
          id: admin._id,
        },
        process.env.JWT_KEY,
        { expiresIn: "1h" }
      );
      res.status(200).json({ admin, token });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };


  export const adminLogin = async (req, res) => {
    const { username, password } = req.body;
  
    try {
      const admin = await UserModel.findOne({ username: username });
      console.log(admin);
  
      if (admin) {
        const validity = await bcrypt.compare(password, admin.password);
  
        if (!validity) {
          res.status(400).json("Wrong password");
        } else {
          const token = jwt.sign(
            {
                email: admin.username,
              id: admin._id,
            },
            process.env.JWT_KEY,
            { expiresIn: "1h" }
          );
  
          res.status(200).json({ admin, token });
        }
      } else {
        res.status(404).json("User does not exists");
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  export const adminUserList= async (req, res, next) => {
    try {
      const users = await UserModel.find().lean()
  
      res.status(200).json({ users })
    } catch (error) {
      console.log(error)
    }
  }

  export const blockUser=async(req,res,next)=>{
    try {
      const userId=req.body.userId
      
      console.log(req.body,"blicing")
      await UserModel.updateOne({_id:userId},
      {
        $set:{
          Active:false
        }
      })
      res.status(200).json({blockstatus: true})
    } catch (error) {
      res.status(500).json({ message: error.message})
    }
  }
 
  export const unblockUser=async(req,res,next)=>{
    try {
      const userId=req.body.userId
      console.log(req.body,"unblocking")
      await UserModel.updateOne({_id:userId},
      {
        $set:{
          Active:true
        }
      })
      res.status(200).json({unblockstatus: true})
    } catch (error) {
      res.status(500).json({ message: error.message})
    }
  }
 