import { Router } from 'express';
import AuthController from './auth.controller';
import { Routes } from '../core/interfaces';
import { CreateUserDto } from '../core/dtos/users.dto';
import authMiddleware from '../core/middlewares/auth.middleware';
import validationMiddleware from '../core/middlewares/validation.middleware';

class AuthRoute implements Routes {
  public router = Router();
  public authController = new AuthController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post('/signup', validationMiddleware(CreateUserDto, 'body'), this.authController.signUp);
    this.router.post('/login', validationMiddleware(CreateUserDto, 'body'), this.authController.logIn);
    this.router.post('/logout', authMiddleware, this.authController.logOut);
  }
}

export default AuthRoute;
