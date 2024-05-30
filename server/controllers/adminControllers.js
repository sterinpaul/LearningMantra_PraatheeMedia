import courseHelpers from '../helpers/courseHelpers.js';
import userHelpers from '../helpers/userHelpers.js';
import authService from '../utils/authService.js';


const adminControllers = () => {
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

    const addCourse = async(req,res)=>{
        const { name, description } = req.body;
        const capitalizedName = name.toUpperCase()
        try {
            const saveResponse = await courseHelpers.addACourse(capitalizedName, description)
            if (saveResponse) {
                return res.status(200).json({ status: true, data: saveResponse})
            }
            return res.status(200).json({ status: false, message: 'Could not add the course' });
        } catch (error) {
            return res.status(500).json({ status: false, message: 'Internal error', error: error.message });
        }
    }

    const editCourse = async(req,res)=>{
        const {_id,...updatedData} = req.body;
        updatedData.name = updatedData.name.toUpperCase()
        try {
            const editResponse = await courseHelpers.editACourse(_id,updatedData)
            if (editResponse) {
                return res.status(200).json({ status: true, message:"Course updated", data:editResponse})
            }
            return res.status(200).json({ status: false, message: 'Could not update the course' });
        } catch (error) {
            return res.status(500).json({ status: false, message: 'Internal error', error: error.message });
        }
    }

    const removeCourse = async(req,res)=>{
        const { id } = req.params;
        try {
            const removeResponse = await courseHelpers.removeACourse(id)
            if (removeResponse.modifiedCount) {
                return res.status(200).json({ status: true, message:"Course removed"})
            }
            return res.status(200).json({ status: false, message: 'Could not remove the course' });
        } catch (error) {
            return res.status(500).json({ status: false, message: 'Internal error', error: error.message });
        }
    }



    const getStudents = async(req, res) => {
        try {
            const response = await userHelpers.getUsers();
            if(response.length){
                return res.status(200).json({ status:true, data:response });
            }
            return res.status(200).json({ status:false, message: "No Students found" });
        } catch (error) {
            return res.status(500).json({ message: 'Error getting students', error: error.message });
        }
    }

    const addStudent = async(req,res)=>{
        const { email, password } = req.body
        const lowerCaseEmail = email.toLowerCase()
        try {
            const userExists = await userHelpers.getSingleUser(lowerCaseEmail)
            if(userExists){
                return res.status(200).json({status:false,message:"User already exists"})
            }
            const encryptedPassword = await authService.encryptPassword(password)
            const registerUser = await userHelpers.registerUser(lowerCaseEmail,encryptedPassword)
            if(registerUser){
                return res.status(200).json({status:true,data: {_id:registerUser._id,email:registerUser.email,createdAt:registerUser.createdAt,updatedAt:registerUser.updatedAt,isActive:registerUser.isActive}})
            }
            return res.status(500).json({status:false,message:"Registration failed"})
        } catch (error) {
            console.error("Internal server error : ",error);
            return res.status(500).json({status:false,message:"Internal server error"})
        }
    }

    const editStudent = async(req,res)=>{
        const {_id,email} = req.body;
        const lowerCaseEmail = email.toLowerCase()
        try {
            const editResponse = await userHelpers.editAStudent(_id,lowerCaseEmail)
            if (editResponse) {
                return res.status(200).json({ status: true, message:"Student E-mail updated", data:editResponse})
            }
            return res.status(200).json({ status: false, message: 'Could not update the email' });
        } catch (error) {
            return res.status(500).json({ status: false, message: 'Internal error', error: error.message });
        }
    }

    const removeStudent = async(req,res)=>{
        const { id } = req.params;
        try {
            const removeResponse = await userHelpers.removeAStudent(id)
            if (removeResponse.modifiedCount) {
                return res.status(200).json({ status: true, message:"Student removed"})
            }
            return res.status(200).json({ status: false, message: 'Could not remove the student' });
        } catch (error) {
            return res.status(500).json({ status: false, message: 'Internal error', error: error.message });
        }
    }
    
    return {
        getCourses,
        addCourse,
        editCourse,
        removeCourse,
        addStudent,
        editStudent,
        getStudents,
        removeStudent
    }
}

export default adminControllers;