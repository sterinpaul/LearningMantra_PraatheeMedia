import adminHelpers from '../helpers/adminHelpers.js';
import tokenHelpers from '../helpers/tokenHelpers.js';
import configKeys from '../config/configKeys.js';
import authService from '../utils/authService.js';

const adminAuthControllers = () => {
    const registerAdmin = async(req, res) => {
        const { email, password } = req.body;
        const lowerCaseEmail = email.toLowerCase()
        try {
            const encryptedPassword = await authService.encryptPassword(password)
            const response = await adminHelpers.registerAdmin(lowerCaseEmail, encryptedPassword);
            if(response){
                return res.status(200).json({ status:true, message: 'Registration success' });
            }
            return res.status(200).json({ status:false, message: "Registration failed" });
        } catch (error) {
            return res.status(500).json({ message: 'Error registering  admin', error: error.message });
        }
    }

    const signInAdmin = async(req,res)=>{
        const { email, password } = req.body;
        const lowerCaseEmail = email.toLowerCase()
        try {
            const adminExists = await adminHelpers.getAdmin(lowerCaseEmail);
            if(!adminExists){
                return res.status(200).json({ status:false, message: "Admin does not exist" });
            }
            const checkPassword = await authService.comparePassword(password, adminExists.password)
            if (!checkPassword) {
                return res.status(200).json({ status: false, message: "Incorrect password" })
            }
            const payload = {
                id: adminExists._id,
                role: configKeys.JWT_ADMIN_ROLE
            }
            const accessToken = authService.generateToken(payload, configKeys.JWT_ACCESS_SECRET_KEY)
            const refreshToken = authService.generateToken(payload, configKeys.JWT_REFRESH_SECRET_KEY)
            try {
                if (refreshToken) {
                    const refreshTokenToDb = await tokenHelpers.addToken(adminExists._id, refreshToken)
                    if (refreshTokenToDb) {
                        return res.status(200).json({status: true, message: "Signin success", data:{
                            id: adminExists._id,
                            token: accessToken
                        }})
                    }
                }
            } catch (error) {
                throw new Error(`Error creating session: ${error.message}`);
            }
            
        } catch (error) {
            return res.status(500).json({ message: 'Sign in failed', error: error.message });
        }
    }

    const signOutAdmin = async (req, res) => {
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
        registerAdmin,
        signInAdmin,
        signOutAdmin
    }
}

export default adminAuthControllers;