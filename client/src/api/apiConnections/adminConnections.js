import baseUrlAdmin from '../baseUrlAdmin'


export const getAllCourses = async() => {
    try{
        const response = await baseUrlAdmin.get(`/admin/getCourses`);
        if (response) {
            return response.data
        }
    }catch(error){
        console.error(`Error getting courses ${error.message}`);
        throw new Error(`Error getting courses ${error.message}`);
    }
}


export const addCourse = async(courseData) => {
    try{
        const response = await baseUrlAdmin.post(`/admin/addCourse`,courseData);
        if (response) {
            return response.data
        }
    }catch(error){
        console.error(`Error adding course ${error.message}`);
        throw new Error(`Error adding course ${error.message}`);
    }
}


export const editCourse = async(courseData) => {
    try{
        const response = await baseUrlAdmin.put(`/admin/editCourse`,courseData);
        if (response) {
            return response.data
        }
    }catch(error){
        console.error(`Error editing course ${error.message}`);
        throw new Error(`Error editing course ${error.message}`);
    }
}


export const removeCourse = async(id) => {
    try{
        const response = await baseUrlAdmin.patch(`/admin/removeCourse/${id}`);
        if (response) {
            return response.data
        }
    }catch(error){
        console.error(`Error removing course ${error.message}`);
        throw new Error(`Error removing course ${error.message}`);
    }
}


export const getAllStudents = async() => {
    try{
        const response = await baseUrlAdmin.get(`/admin/getStudents`);
        if (response) {
            return response.data
        }
    }catch(error){
        console.error(`Error getting students ${error.message}`);
        throw new Error(`Error getting students ${error.message}`);
    }
}


export const addStudent = async(courseData) => {
    try{
        const response = await baseUrlAdmin.post(`/admin/addStudent`,courseData);
        if (response) {
            return response.data
        }
    }catch(error){
        console.error(`Error adding student ${error.message}`);
        throw new Error(`Error adding student ${error.message}`);
    }
}


export const editStudent = async(courseData) => {
    try{
        const response = await baseUrlAdmin.put(`/admin/editStudent`,courseData);
        if (response) {
            return response.data
        }
    }catch(error){
        console.error(`Error editing student ${error.message}`);
        throw new Error(`Error editing student ${error.message}`);
    }
}


export const removeStudent = async(id) => {
    try{
        const response = await baseUrlAdmin.patch(`/admin/removeStudent/${id}`);
        if (response) {
            return response.data
        }
    }catch(error){
        console.error(`Error removing student ${error.message}`);
        throw new Error(`Error removing student ${error.message}`);
    }
}

