import express from 'express';

import LoginController  from '../controllers/login-controller.js';
import RegisterController from '../controllers/register-controller.js';
import WorkerController from '../controllers/worker-controller.js';
import CowController from '../controllers/cow-controller.js';
import TaskController from '../controllers/task-controller.js';
import TransactionController from '../controllers/transaction-controller.js';
import TransactionCategoryController from '../controllers/transaction-category-controller.js';
import EventController from '../controllers/event-controller.js';
import authMiddleware from '../middleware/auth-middleware.js';
import guestMiddleware from '../middleware/guest-middleware.js';

const router = express.Router();

router.post('/login', guestMiddleware, LoginController.login);
router.post('/register', guestMiddleware, RegisterController.register);
router.post('/logout', authMiddleware, LoginController.logout);

router.get('/task', authMiddleware, TaskController.index);
router.get('/task/upcoming', authMiddleware, TaskController.upcomingTask);
router.post('/task', authMiddleware, TaskController.store);
router.delete('/task/:id', authMiddleware, TaskController.destroy);
router.patch('/task/:id', authMiddleware, TaskController.updateStatus);

router.post('/cow', authMiddleware, CowController.store);
router.get('/cow', authMiddleware, CowController.index);
router.get('/cow/:id', authMiddleware, CowController.show);
router.put('/cow/:id', authMiddleware, CowController.update);
router.delete('/cow/:id', authMiddleware, CowController.destroy);

router.post('/worker', authMiddleware, WorkerController.store);
router.get('/worker', authMiddleware, WorkerController.index);
router.put('/worker/:id', authMiddleware, WorkerController.update);
router.delete('/worker/:id', authMiddleware, WorkerController.destroy);

router.get('/transaction', authMiddleware,  TransactionController.index);
router.post('/transaction', authMiddleware, TransactionController.store);
router.put('/transaction/:id', authMiddleware, TransactionController.update);
router.delete('/transaction/:id', authMiddleware, TransactionController.destroy);

router.get('/transaction/category', authMiddleware, TransactionCategoryController.index);
router.post('/transaction/category', authMiddleware, TransactionCategoryController.store);

router.get('/event', authMiddleware, EventController.index);
router.post('/event', authMiddleware, EventController.store);
router.put('/event/:id', authMiddleware, EventController.update);
router.delete('/event/:id', authMiddleware, EventController.destroy);

export default router;