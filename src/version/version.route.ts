import { Router } from 'express';
import { Routes } from '../core/interfaces';
import VersionController from './version.controller';

class VersionRoute implements Routes {
  public router = Router();
  public versionController = new VersionController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get('/version', this.versionController.version);
  }
}

export default VersionRoute;
