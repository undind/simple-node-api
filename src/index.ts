import express from 'express';
import bodyParser from 'body-parser';

import UserController from './controllers/userController';
import PostsController from './controllers/postsController';

const app = express();
const port = 4000;

app.use(bodyParser.json());

import './core/db';

const UserCtrl = new UserController();
const PostsCtrl = new PostsController();

app.get('/api/login', UserCtrl.login);

app.post('/api/post/create', PostsCtrl.create);
app.get('/api/posts/get', PostsCtrl.index);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));