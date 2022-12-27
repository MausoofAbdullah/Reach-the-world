import UserModel from "../Models/userModel.js";
import bcrypt from "bcrypt"

//get user

export const getUser = async (req, res) => {
  const id = req.params.id;

  try {
    const user = await UserModel.findById(id);
    if (user) {
      const { password, ...otherDetails } = user._doc;
      res.status(200).json(otherDetails);
    } else {
      res.status(400).json("no such user exists");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

//update user

export const updateUser=async(req,res)=>{
    const id=req.params.id
    const{currentUserId,currentUserAdminStatus,password}=req.body

    if(id===currentUserId || currentUserAdminStatus){
        try {

        if(password){
          const salt= await bcrypt.genSalt(10)
          req.body.password=await bcrypt.hash(password,salt)
        }
            const user = await UserModel.findByIdAndUpdate(id,req.body,{new:true})
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json(error);
        }
    }
    else{
      res.status(403).json("access denied, you can only update your profile")
    }
} 

export const deleteUser=async(req,res)=>{
  const id=req.params.id
  const{currentUserId,currentUserAdminStatus}=req.body
  if(id===currentUserId || currentUserAdminStatus){
    try {
      await UserModel.findByIdAndDelete(id)
      res.status(200).json("user deleted successfully")
    } catch (error) {
      res.status(500).json(error);
    }
  }
  else{
    res.status(403).json("access denied, you can only delete your profile")
  }

}

//follow user and following user

export const followUser=async (req,res)=>{
  const id=req.params.id
  const {currentUserId}=req.body
  if(id===currentUserId){
    res.status(403).json("action forbidden")
  }
  else{
    try {
      const followUser=await UserModel.findById(id)
      const followingUser=await UserModel.findById(currentUserId)

      if(!followUser.followers.includes(currentUserId)){
        await followUser.updateOne({ $push:{ followers:currentUserId } })
        await followingUser.updateOne({ $push: { following:id} })
        res.status(200).json("user followed")
      }
      else{
        res.status(403).json("user is already followed by you!")
      }
    } catch (error) {
      res.status(500).json(error);
    }
  }
}

//unfollow a user

export const unFollowUser=async (req,res)=>{
  const id=req.params.id
  const {currentUserId}=req.body
  if(id===currentUserId){
    res.status(403).json("action forbidden")
  }
  else{
    try {
      const unFollowUser=await UserModel.findById(id)
      const unFollowingUser=await UserModel.findById(currentUserId)

      if(unFollowUser.followers.includes(currentUserId)){
        await unFollowUser.updateOne({ $pull:{ followers:currentUserId } })
        await unFollowingUser.updateOne({ $pull: { following:id} })
        res.status(200).json("user unfollowed")
      }
      else{
        res.status(403).json("user is not followed by you!")
      }
    } catch (error) {
      res.status(500).json(error);
    }
  }
}