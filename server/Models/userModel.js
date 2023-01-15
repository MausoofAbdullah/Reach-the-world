import mongoose from "mongoose";

const UserSchema=mongoose.Schema(
    {
        username:{
            type:String,
            required:true
        },
        mobile: {
            type: Number,
            required: [true, 'Please provide mobile number'],
            unique: true
          },
        password:{
            type:String,
            required:true
        },
        firstname:{
            type:String,
            required:true
        },
        lastname:{
            type:String,
            required:true
        },
        isAdmin:{
            type:Boolean,
            default:false
        },
        profilePicture: String,
        coverPicture:String,
        about:String,
        livesin:String,
        worksAt:String,
        relationship:String,
        country:String,
        followers:[],
        following:[],
        Active:{
            type:Boolean,
            default:true
        }
    },
    {timestamps:true}
)

const UserModel=mongoose.model("users",UserSchema)
export default UserModel