import userModel from "../models/userModel.js";
import mongoose from "mongoose";

const userHelpers = {
  getUsers: async () => {
    try {
      return await userModel.find({isActive:true},{password:0,__v:0}).sort({updatedAt:-1});
    } catch (error) {
      throw new Error(`Error getting students: ${error.message}`);
    }
  },
  registerUser: async (email, password) => {
    try {
      const newUser = new userModel({
        email,
        password
      });
      return await newUser.save();
    } catch (error) {
      throw new Error(`Error registering student: ${error.message}`);
    }
  },
  getSingleUser: async (email) => {
    try {
      return await userModel.findOne({ isActive:true, email },{__v:0})
    } catch (error) {
      throw new Error(`Error getting student: ${error.message}`);
    }
  },
  getSingleUserById: async (_id) => {
    try {
      return await userModel.findOne({ _id },{__v:0,password:0})
    } catch (error) {
      throw new Error(`Error getting student: ${error.message}`);
    }
  },
  editAStudent: async (_id,email) => {
    try {
      return await userModel.findOneAndUpdate({ _id },{$set:{email}},{ new: true, select: '-__v -password' })
    } catch (error) {
      throw new Error(`Error updating student: ${error.message}`);
    }
  },
  removeAStudent: async (_id) => {
    try {
      return await userModel.updateOne({ _id },{$set:{isActive:false}})
    } catch (error) {
      throw new Error(`Error removing student: ${error.message}`);
    }
  },
  userCourseUpdation: async (_id,courseId,isActive) => {
    try {
      if(isActive){
        return await userModel.updateOne({ _id },{$pull:{courses:courseId}})
      }else{
        return await userModel.updateOne({ _id },{$addToSet:{courses:courseId}})
      }
    } catch (error) {
      throw new Error(`Error updating student course: ${error.message}`);
    }
  },
  userCourseRemoval: async (_id,courseId) => {
    try {
      return await userModel.updateOne({ _id },{$pull:{courses:courseId}})      
    } catch (error) {
      throw new Error(`Error removing student course: ${error.message}`);
    }
  },
  getUserSelectedCourses: async (id) => {
    const _id = new mongoose.Types.ObjectId(id)
    try {
      return await userModel.aggregate(
        [
          {
            $match: {_id}
          },
          {
            $lookup: {
              from: "courses",
              let: { courseId: "$courses" },
              pipeline: [
                {
                  $match: {
                    $expr: {
                      $and: [
                        { $in: ["$_id", { $map: { input: "$$courseId", as: "id", in: { $toObjectId: "$$id" } } }] },
                        { $eq: ["$isActive", true] }
                      ]
                    }
                  }
                },
                {
                  $project: {
                    _id: 1,
                    name: 1,
                    description: 1,
                    createdAt: 1,
                    updatedAt: 1
                  }
                }
              ],
              as: "result"
            }
          },
          {
            $unwind: "$result"
          },
          {
            $group: {
              _id: "$result._id",
              name: { $first: "$result.name" },
              description: { $first: "$result.description" },
              createdAt: { $first: "$result.createdAt" },
              updatedAt: { $first: "$result.updatedAt" }
            }
          }
        ]
        
      )
    } catch (error) {
      throw new Error(`Error updating student course: ${error.message}`);
    }
  }
}

export default userHelpers;