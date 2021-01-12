import { NextFunction, Request, Response } from 'express';
import { RequestWithUser } from '../core/interfaces';
import TestService from './test.service';

import render from 'preact-render-to-string';
import { MyComponent } from '../frontend';

class TestController {
  public testService = new TestService();

  public test = async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.status(200).send(render(MyComponent({ name: 'jesus', age: 22 })));
      // res.status(201).json({ data: 'hey there', message: 'test' });
    } catch (error) {
      next(error);
    }
  };

  public testV2 = async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.status(201).json({ data: await this.testService.getVersion(), message: 'testv2' });
    } catch (error) {
      next(error);
    }
  };

  public test_v2 = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      res.status(201).json({ data: 'hey there', message: 'test/v2' });
    } catch (error) {
      next(error);
    }
  };
}

export default TestController;
