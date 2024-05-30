import express from 'express';
import adminAuthControllers from '../controllers/adminAuthControllers.js';

const adminAuthRoutes = () => {
    const router = express.Router();
    const controllers = adminAuthControllers();
    router.post('/signIn', controllers.signInAdmin);
    router.post('/signUp', controllers.registerAdmin);
    router.delete('/signOut/:id', controllers.signOutAdmin);

    return router;
}

export default adminAuthRoutes;