import express from 'express';
import bodyParser from 'body-parser';
import { check } from 'express-validator';

import UserController from './controllers/userController';

const app = express();
const port = 4000;

app.use(bodyParser.json());

import './core/db';

const UserCtrl = new UserController();

app.get('/api/login', UserCtrl.login);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));