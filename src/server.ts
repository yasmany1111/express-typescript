import 'dotenv/config';
import App from './app';
import AuthRoute from './auth/auth.route';
import IndexRoute from './index/index.route';
import UsersRoute from './users/users.route';
import validateEnv from './core/utils/validateEnv';
import TestRoute from './test/test.route';
import VersionRoute from './version/version.route';

validateEnv();

const app = new App([new IndexRoute(), new UsersRoute(), new AuthRoute(), new TestRoute(), new VersionRoute()]);

app.listen();
