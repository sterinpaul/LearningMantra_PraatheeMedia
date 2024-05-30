import baseURL from '../baseUrl'


export const adminSignIn = async(credentials) => {
    try{
        const response = await baseURL.post(`/adminAuth/signIn`,credentials);
        if (response) {
            return response.data
        }
    }catch(error){
        console.error(`Error signing in ${error.message}`);
        throw new Error(`Error signing in ${error.message}`);
    }
}


export const adminSignOut = async(id)=>{
    try{
        const response = await baseURL.delete(`/adminAuth/signOut/${id}`);
        if (response) {
            return response.data
        }
    }catch(error){
        console.error(`Error signing out: ${error.message}`);
        throw new Error(`Error signing out ${error.message}`);
    }
}