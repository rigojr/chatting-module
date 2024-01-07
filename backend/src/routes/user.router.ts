import express from 'express';
import { UserService } from '../services/user.service';

const userRouter = express.Router();
const userService = new UserService();

userRouter.post('/signup', (req, res) => userService.signUp(req, res));
userRouter.post('/login', (req, res) => userService.login(req, res));

export default userRouter;
