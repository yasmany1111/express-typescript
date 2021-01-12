import { NextFunction, Request, Response } from 'express';
import TestService from './test.service';

class TestController {
  public testService = new TestService();

  public test = async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.status(201).json({ data: 'Module', message: 'test' });
    } catch (error) {
      next(error);
    }
  };
}

export default TestController;
