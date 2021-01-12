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
    this.router.get('/test2', this.testController.testV2);
    this.router.get('/test/v2', this.testController.test_v2);
  }
}

export default TestRoute;
