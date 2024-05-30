import baseURL from '../baseUrl'


export const getAllCourses = async() => {
    try{
        const response = await baseURL.get(`/user/getCourses`);
        if (response) {
            return response.data
        }
    }catch(error){
        console.error(`Error getting courses ${error.message}`);
        throw new Error(`Error getting courses ${error.message}`);
    }
}


export const getUserCourses = async() => {
    try{
        const response = await baseURL.get(`/user/getUserCourses`);
        if (response) {
            return response.data
        }
    }catch(error){
        console.error(`Error getting user courses ${error.message}`);
        throw new Error(`Error getting user courses ${error.message}`);
    }
}


export const changeCourseStatus = async (isActive,courseId) => {
    try{
        const response = await baseURL.patch(`/user/addOrRemoveCourse`,{isActive,courseId});
        if (response) {
            return response.data
        }
    }catch(error){
        console.error(`Error adding/removing course ${error.message}`);
        throw new Error(`Error adding/removing course ${error.message}`);
    }
}


export const removeCourse = async (courseId) => {
    try{
        const response = await baseURL.patch(`/user/removeCourse`,{courseId});
        if (response) {
            return response.data
        }
    }catch(error){
        console.error(`Error removing course ${error.message}`);
        throw new Error(`Error removing course ${error.message}`);
    }
}


export const getUserCourseDetails = async () => {
    try{
        const response = await baseURL.get(`/user/getUserCourseDetails`);
        if (response) {
            return response.data
        }
    }catch(error){
        console.error(`Error getting user courses ${error.message}`);
        throw new Error(`Error getting user courses ${error.message}`);
    }
}

