import userHelpers from '../helpers/userHelpers.js';
import authService from '../utils/authService.js';
import configKeys from '../config/configKeys.js';
import tokenHelpers from '../helpers/tokenHelpers.js';


const userAuthControllers = () => {
    const signUp = async (req,res)=>{
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
                return res.status(200).json({status:true,message:"Registration success"})
            }
            return res.status(500).json({status:false,message:"Registration failed"})
        } catch (error) {
            console.error("Internal server error : ",error);
            return res.status(500).json({status:false,message:"Internal server error"})
        }
    }

    const signIn = async (req, res) => {
        const { email, password } = req.body
        const lowerCaseEmail = email.toLowerCase()
        try {
            const userExists = await userHelpers.getSingleUser(lowerCaseEmail)
            if (!userExists) {
                return res.status(200).json({ status: false, message: "User does not exist" })
            }
    
            const checkPassword = await authService.comparePassword(password, userExists.password)
            if (!checkPassword) {
                return res.status(200).json({ status: false, message: "Incorrect password" })
            }
            const payload = {
                id: userExists._id,
                role: configKeys.JWT_USER_ROLE
            }
            const accessToken = authService.generateToken(payload, configKeys.JWT_ACCESS_SECRET_KEY)
            const refreshToken = authService.generateToken(payload, configKeys.JWT_REFRESH_SECRET_KEY)
            try {
                if (refreshToken.length) {
                    const refreshTokenToDb = await tokenHelpers.addToken(userExists._id, refreshToken)
                    
                    if (refreshTokenToDb) {
                        return res.status(200).json({status: true, message: "Signin success", data:{id: userExists._id, token: accessToken, email: userExists.email}})
                    }
                }
            } catch (error) {
                throw new Error(`Error creating session: ${error.message}`);
            }
            
        } catch (error) {
            return res.status(500).json({status:false,message:"Internal server error"})
        }
    }

    const signOut = async (req, res) => {
        const { id } = req.params
        try {
            const deleteToken = await tokenHelpers.deleteToken(id)
            if (deleteToken.deletedCount) {
                return res.status(200).json({ status: true, message: "Sign out Success" })
            }
            return res.status(200).json({ status: false, message: "Sign out failed" })
        } catch (error) {
            return res.status(500).json({ message: 'Sign out failed', error: error.message });
        }
    }


    return {
        signUp,
        signIn,
        signOut
    }
}

export default userAuthControllers;