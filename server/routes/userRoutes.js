import express from 'express';
import userControllers from '../controllers/userControllers.js';


const userRoutes = () => {
    const router = express.Router();
    const controllers = userControllers();

    router.get('/getCourses', controllers.getCourses);
    router.get('/getUserCourses', controllers.getUserCourses);
    router.get('/getUserCourseDetails', controllers.getUserCourseDetails);
    router.patch('/addOrRemoveCourse', controllers.addOrRemoveCourse);
    router.patch('/removeCourse', controllers.removeCourse);

    return router;
}

export default userRoutes;