import { Router } from 'express';
import { Routes } from '../core/interfaces';
import TestController from './test.controller';

class TestRoute implements Routes {
  public router = Router();
  public testController = new TestController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get('/test', this.testController.test);
  }
}

export default TestRoute;
