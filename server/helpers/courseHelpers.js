import courseModel from "../models/courseModel.js";


const courseHelpers = {
  getAllCourses: async () => {
    try {
      return await courseModel.find({isActive:true},{__v:0}).sort({updatedAt:-1});
    } catch (error) {
      throw new Error(`Error getting courses: ${error.message}`);
    }
  },
  addACourse: async (name, description) => {
    try {
      const newCourse = new courseModel({
        name,
        description
      });
      return await newCourse.save();
    } catch (error) {
      throw new Error(`Error adding course : ${error.message}`);
    }
  },
  editACourse: async (_id,updatedData) => {
    try {
      return await courseModel.findOneAndUpdate({ _id },{$set:updatedData},{ new: true, select: '-__v' })
    } catch (error) {
      throw new Error(`Error editing the course : ${error.message}`);
    }
  },
  removeACourse: async (_id) => {
    try {
      return await courseModel.updateOne({_id},{$set:{isActive:false}})
    } catch (error) {
      throw new Error(`Error removing course : ${error.message}`);
    }
  },
}

export default courseHelpers;