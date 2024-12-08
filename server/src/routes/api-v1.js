import express from 'express';

import LoginController  from '../controllers/login-controller.js';
import RegisterController from '../controllers/register-controller.js';
import WorkerController from '../controllers/worker-controller.js';
import CowController from '../controllers/cow-controller.js';
import TaskController from '../controllers/task-controller.js';
import TransactionController from '../controllers/transaction-controller.js';
import TransactionCategoryController from '../controllers/transaction-category-controller.js';

const router = express.Router();

router.post('/login', LoginController.login);
router.post('/register', RegisterController.register);

router.get('/task', TaskController.index);
router.get('/task/upcoming', TaskController.upcomingTask);
router.post('/task', TaskController.store);

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

export default router;