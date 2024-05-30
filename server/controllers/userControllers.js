import courseHelpers from '../helpers/courseHelpers.js';
import userHelpers from '../helpers/userHelpers.js';


const userControllers = () => {
    const getCourses = async(req, res) => {
        try {
            const response = await courseHelpers.getAllCourses();
            if(response.length){
                return res.status(200).json({ status:true, data:response });
            }
            return res.status(200).json({ status:false, message: "No courses found" });
        } catch (error) {
            return res.status(500).json({ message: 'Error getting courses', error: error.message });
        }
    }

    const getUserCourses = async(req, res) => {
        const {id} = req.payload
        try {
            const response = await userHelpers.getSingleUserById(id);
            if(response){
                return res.status(200).json({ status:true, data:response.courses });
            }
            return res.status(200).json({ status:false, message: "No courses found" });
        } catch (error) {
            return res.status(500).json({ message: 'Error getting courses', error: error.message });
        }
    }

    const getUserCourseDetails = async(req, res) => {
        const {id} = req.payload
        try {
            const response = await userHelpers.getUserSelectedCourses(id);
            if(response.length){
                return res.status(200).json({ status:true, data:response });
            }
            return res.status(200).json({ status:false, message: "No courses found" });
        } catch (error) {
            return res.status(500).json({ message: 'Error getting courses', error: error.message });
        }
    }

    const addOrRemoveCourse = async(req, res) => {
        const {id} = req.payload
        const {courseId,isActive} = req.body
        try {
            const response = await userHelpers.userCourseUpdation(id,courseId,isActive);
            if(response.modifiedCount){
                return res.status(200).json({ status:true, message:`${isActive ? "Course removed" : "Course Added"}` });
            }
            return res.status(200).json({ status:false, message: "Updation failed" });
        } catch (error) {
            return res.status(500).json({ message: 'Error updating course', error: error.message });
        }
    }

    const removeCourse = async(req, res) => {
        const {id} = req.payload
        const {courseId} = req.body
        try {
            const response = await userHelpers.userCourseRemoval(id,courseId);
            if(response.modifiedCount){
                return res.status(200).json({ status:true, message:"Course removed"});
            }
            return res.status(200).json({ status:false, message: "Course removal failed" });
        } catch (error) {
            return res.status(500).json({ message: 'Error removing course', error: error.message });
        }
    }


    return {
        getCourses,
        getUserCourses,
        getUserCourseDetails,
        addOrRemoveCourse,
        removeCourse
    }
}

export default userControllers;