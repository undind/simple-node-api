import express from 'express';

import PostsModel, { IPosts } from '../models/Posts';

class PostsController {
  create = async (req: express.Request, res: express.Response) => {
    const postData = {
      title: req.body.title,
      description: req.body.description
    }

    const newPost = new PostsModel(postData);

    if (!postData.title || !postData.description) {
      return res.json({
        status: 'error',
        message: 'Заполните сообщение или заголовок!'
      })
    }

    try {
      await newPost.save();
      res.json(newPost)
    } catch (error) {
      res.json({
        status: 'error',
        error
      })
    }
  }

  index = async (req: express.Request, res: express.Response) => {
    try {
      await PostsModel.find({}, (err, posts: IPosts) => {
        if (err) {
          return res.json({
            status: 'error',
            err
          })
        }

        return res.json({
          status: 'success',
          posts
        })
      })
    } catch (error) {
      return res.json({
        status: 'error',
        error
      })
    }
  }
}

export default PostsController;