import { NextFunction, Request, Response } from 'express';

export const apiVersion = '0.0.0';

class IndexController {
  public index = (req: Request, res: Response, next: NextFunction) => {
    try {
      res.sendStatus(200);
    } catch (error) {
      next(error);
    }
  };
}

export default IndexController;
