import baseURL from '../baseUrl'


export const signIn = async(credentials) => {
    try{
        const response = await baseURL.post(`/userAuth/signIn`,credentials);
        if (response) {
            return response.data
        }
    }catch(error){
        console.error(`Error signing in ${error.message}`);
        throw new Error(`Error signing in ${error.message}`);
    }
}


export const signUp = async(credentials) => {
    try{
        const response = await baseURL.post(`/userAuth/signUp`,credentials);
        if (response) {
            return response.data
        }
    }catch(error){
        console.error(`Error signing up ${error.message}`);
        throw new Error(`Error signing up ${error.message}`);
    }
}


export const userSignOut = async(id)=>{
    try{
        const response = await baseURL.delete(`/userAuth/signOut/${id}`);
        if (response) {
            return response.data
        }
    }catch(error){
        console.error(`Error signing out: ${error.message}`);
        throw new Error(`Error signing out: ${error.message}`);
    }
}