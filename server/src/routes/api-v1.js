import express from 'express';

import LoginController  from '../controllers/login-controller.js';
import RegisterController from '../controllers/register-controller.js';
import WorkerController from '../controllers/worker-controller.js';
import CowController from '../controllers/cow-controller.js';
import TaskController from '../controllers/task-controller.js';
import TransactionController from '../controllers/transaction-controller.js';
import TransactionCategoryController from '../controllers/transaction-category-controller.js';
import EventController from '../controllers/event-controller.js';
import TokenController from '../controllers/token-controller.js';
import authMiddleware from '../middleware/auth-middleware.js';
import guestMiddleware from '../middleware/guest-middleware.js';
import UserController from '../controllers/user-controller.js';

const router = express.Router();

router.get('/token', TokenController.refreshToken);

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
router.get('/worker/:id', authMiddleware, WorkerController.show);
router.put('/worker/:id', authMiddleware, WorkerController.update);
router.delete('/worker/:id', authMiddleware, WorkerController.destroy);

router.get('/transaction/category', authMiddleware, TransactionCategoryController.index); // this method must be placed before the /transaction/:id (GET) route
router.post('/transaction/category', authMiddleware, TransactionCategoryController.store);

router.get('/transaction', authMiddleware,  TransactionController.index);
router.post('/transaction', authMiddleware, TransactionController.store);
router.get('/transaction/:id', authMiddleware, TransactionController.show);
router.put('/transaction/:id', authMiddleware, TransactionController.update);
router.delete('/transaction/:id', authMiddleware, TransactionController.destroy);

router.get('/event', authMiddleware, EventController.index);
router.post('/event', authMiddleware, EventController.store);
router.put('/event/:id', authMiddleware, EventController.update);
router.delete('/event/:id', authMiddleware, EventController.destroy);

router.put('/profile/:id', authMiddleware, UserController.update);
router.put('/profile/:id/password/change', authMiddleware, UserController.changePassword);

export default router;