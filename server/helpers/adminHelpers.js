import adminModel from "../models/adminModel.js";


const adminHelpers = {
    registerAdmin: async( email, password) => {
        try {
            const newAdmin = new adminModel({
                email,
                password
            });
            return await newAdmin.save();
        } catch (error) {
            throw new Error(`Error registering super admin: ${error.message}`);
        }
    },
    getAdmin:async(email)=>{
        try{
            return await adminModel.findOne({email},{__v:0})
        }catch(error){
            throw new Error(`Error finding Admin: ${error.message}`);
        }
    }
}

export default adminHelpers;