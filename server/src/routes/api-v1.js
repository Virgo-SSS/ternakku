import express from 'express';

import LoginController  from '../controllers/login-controller.js';
import RegisterController from '../controllers/register-controller.js';
import WorkerController from '../controllers/worker-controller.js';
import CowController from '../controllers/cow-controller.js';
import TaskController from '../controllers/task-controller.js';
import TransactionController from '../controllers/transaction-controller.js';
import TransactionCategoryController from '../controllers/transaction-category-controller.js';
import EventController from '../controllers/event-controller.js';

const router = express.Router();

router.post('/login', LoginController.login);
router.post('/register', RegisterController.register);

router.get('/task', TaskController.index);
router.get('/task/upcoming', TaskController.upcomingTask);
router.post('/task', TaskController.store);
router.delete('/task/:id', TaskController.destroy);
router.patch('/task/:id', TaskController.updateStatus);

router.post('/cow', CowController.store);
router.get('/cow', CowController.index);

router.post('/worker', WorkerController.store);
router.get('/worker', WorkerController.index);
router.put('/worker/:id', WorkerController.update);
router.delete('/worker/:id', WorkerController.destroy);

router.get('/transaction', TransactionController.index);
router.post('/transaction', TransactionController.store);
router.put('/transaction/:id', TransactionController.update);
router.delete('/transaction/:id', TransactionController.destroy);

router.get('/transaction/category', TransactionCategoryController.index);
router.post('/transaction/category', TransactionCategoryController.store);

router.get('/event', EventController.index);
router.post('/event', EventController.store);
router.put('/event/:id', EventController.update);
router.delete('/event/:id', EventController.destroy);

export default router;