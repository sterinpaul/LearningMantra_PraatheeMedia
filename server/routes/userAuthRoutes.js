import express from 'express';
import userAuthControllers from '../controllers/userAuthControllers.js';


const userAuthRoutes = () => {
    const router = express.Router();
    const controllers = userAuthControllers();

    router.post('/signIn', controllers.signIn);
    router.post('/signUp', controllers.signUp);
    router.delete('/signOut/:id', controllers.signOut);

    return router;
}

export default userAuthRoutes;