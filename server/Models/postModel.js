import mongoose from "mongoose";

const postSchema=mongoose.Schema(
    {
        userId: {
            type: String,
            required: true
          },
        desc:String,
        likes:[],
        image:String,
        comments:[{
            commentedUser:{
                type:String,
                required: true
            },
            comment:{
                type:String,
                required:true
            },
            time:{
                type: Date,
                required: true
            },
            user:{
                type:String,
                required:true
            }
        }]},
    {
        timestamps:true
    }
)
const PostModel=mongoose.model("posts",postSchema)
export default PostModel