import express from 'express';
import adminControllers from '../controllers/adminControllers.js';


const adminRoutes = () => {
    const router = express.Router();
    const controllers = adminControllers();

    router.get('/getCourses', controllers.getCourses);
    router.post('/addCourse', controllers.addCourse);
    router.put('/editCourse', controllers.editCourse);
    router.patch('/removeCourse/:id', controllers.removeCourse);

    router.get('/getStudents', controllers.getStudents);
    router.post('/addStudent', controllers.addStudent);
    router.put('/editStudent', controllers.editStudent);
    router.patch('/removeStudent/:id', controllers.removeStudent);

    return router;
}

export default adminRoutes;