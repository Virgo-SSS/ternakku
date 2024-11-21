import express from 'express';

import LoginController  from '../controllers/login-controller.js';
import RegisterController from '../controllers/register-controller.js';

const router = express.Router();

router.post('/login', LoginController.login);
router.post('/register', RegisterController.register);

export default router;