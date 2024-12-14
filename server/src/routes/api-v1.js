import express from 'express';

import LoginController  from '../controllers/login-controller.js';
import RegisterController from '../controllers/register-controller.js';
import WorkerController from '../controllers/worker-controller.js';
import CowController from '../controllers/cow-controller.js';
import TaskController from '../controllers/task-controller.js';

const router = express.Router();

router.post('/login', LoginController.login);
router.post('/register', RegisterController.register);

router.get('/task', TaskController.index);
router.get('/task/upcoming', TaskController.upcomingTask);
router.post('/task', TaskController.store);

router.post('/cow', CowController.store);
router.get('/cow', CowController.index);
router.get('/cow/:id', CowController.show);
router.put('/cow/:id', CowController.update);
router.delete('/cow/:id', CowController.destroy);

router.post('/worker', WorkerController.store);
router.get('/worker', WorkerController.index);
router.put('/worker/:id', WorkerController.update);
router.delete('/worker/:id', WorkerController.destroy);

export default router;