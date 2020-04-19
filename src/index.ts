import mongoose from 'mongoose';
import express from 'express';
import bodyParser from 'body-parser';

import User from './schemas/User';

const app = express();
const port = 4000;

app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/blog', { useNewUrlParser: true, useUnifiedTopology: true });

app.get('/', (req: any, res: any) => {
  res.send('Hello World!');
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));