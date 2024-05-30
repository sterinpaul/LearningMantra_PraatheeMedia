import tokenModel from "../models/tokenModel.js";


const tokenHelpers = {
    getToken:async(id)=>{
        return await tokenModel.findOne({id})
    },
    deleteToken:async(id)=>{
        return await tokenModel.deleteOne({id})
    },
    // Do not remove {upsert:true,new:true} from addToken query
    addToken:async(id,token)=>{
        return await tokenModel.findOneAndUpdate({id},{$set:{token}},{upsert:true,new:true})
    }
}

export default tokenHelpers;