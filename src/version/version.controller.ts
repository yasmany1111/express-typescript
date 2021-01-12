import { NextFunction, Request, Response } from 'express';
import VersionService from './version.service';

class VersionController {
  public versionService = new VersionService();

  public version = async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.status(201).json({ data: 'Module', message: 'test' });
    } catch (error) {
      next(error);
    }
  };
}

export default VersionController;
