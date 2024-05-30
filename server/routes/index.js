import adminAuthRoutes from './adminAuthRoutes.js';
import userAuthRoutes from './userAuthRoutes.js';
import userRoutes from './userRoutes.js';
import adminRoutes from './adminRoutes.js';
import authMiddleware from './../middleware/authMiddleware.js'
import configKeys from '../config/configKeys.js';


const routes = (app)=>{
    app.use('/api/userAuth',userAuthRoutes())
    app.use('/api/user',authMiddleware(configKeys.JWT_USER_ROLE),userRoutes())

    app.use('/api/admin',authMiddleware(configKeys.JWT_ADMIN_ROLE),adminRoutes())
    app.use('/api/adminAuth',adminAuthRoutes());
}

export default routes