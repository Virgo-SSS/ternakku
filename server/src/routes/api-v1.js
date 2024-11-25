import express from 'express';

import LoginController  from '../controllers/login-controller.js';
import RegisterController from '../controllers/register-controller.js';
import WorkerController from '../controllers/worker-controller.js';
import CowController from '../controllers/cow-controller.js';
import TaskController from '../controllers/task-controller.js';

const router = express.Router();

router.post('/login', LoginController.login);
router.post('/register', RegisterController.register);
router.post('/task', TaskController.store);


router.post('/cow', CowController.store);
router.get('/cow', CowController.index);

router.post('/worker', WorkerController.store);
router.get('/worker', WorkerController.index);

export default router;