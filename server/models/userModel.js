import { model, Schema } from "mongoose";


const userSchema = new Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true
        }, 
        password: {
            type: String,
            required: true
        },
        courses: {
            type:Array,
            default: []
        },
        isActive:{
            type:Boolean,
            default: true
        }
    },
    {
        timestamps:true
    }
)

const userModel = model('user', userSchema);
export default userModel;