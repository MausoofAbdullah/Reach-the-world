import mongoose from "mongoose";
const {ObjectId}=mongoose.Schema;

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
            },
            // report:[
            //     {
            //         id:{
            //             type:ObjectId,
            //             ref:"users",
                    
            //         },
            //         savedAt:{
            //             type:Date,
            //             required:true
            //         }
            //     }
            // ]
            report: {
                type: Map,  
                of: Boolean,
              }
            
        }]},
    {
        timestamps:true
    }
)
const PostModel=mongoose.model("posts",postSchema)
export default PostModel