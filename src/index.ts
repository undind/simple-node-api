import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import UserController from './controllers/userController';
import PostsController from './controllers/postsController';

const app = express();
const port = 4000;

app.use(cors());
app.use(bodyParser.json());

import './core/db';

const UserCtrl = new UserController();
const PostsCtrl = new PostsController();

app.get('/api/login', UserCtrl.login);

//Posts
app.post('/api/post/create', PostsCtrl.create);
app.delete('/api/post/delete/:id', PostsCtrl.delete);
app.post('/api/post/update/:id', PostsCtrl.update);
app.post('/api/post/update-claps/:id', PostsCtrl.updateClaps);
app.get('/api/posts/get', PostsCtrl.index);

//Users
app.get('/api/signin', UserCtrl.login);
app.post('/api/signup', UserCtrl.registration);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));