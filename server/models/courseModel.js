import { model, Schema } from "mongoose";


const courseSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        }, 
        description: {
            type: String,
            required: true
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

const courseModel = model('course', courseSchema);
export default courseModel;