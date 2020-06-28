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
      return res.status(400).json({
        status: 'error',
        message: 'Заполните сообщение или заголовок!'
      })
    }

    try {
      await newPost.save()
      return res.status(200).json({
        status: 'success',
      });
    } catch (error) {
      res.status(400).json({
        status: 'error',
        error
      })
    }
  }

  delete = async (req: express.Request, res: express.Response) => {
    const id: string = req.params.id;

    try {
      await PostsModel.findOneAndRemove({ _id: id }, (error, post) => {
        if (error) return res.status(400).json({
          status: 'error',
          error
        });

        if (!post) return res.status(404).json({
          status: 'error',
          error: 'Такого поста не существует!'
        });

        return res.status(200).json({
          status: 'success',
        });
      })
    } catch (error) {
      res.status(500).json({
        status: 'error',
        error
      })
    }
  }

  update = async (req: express.Request, res: express.Response) => {
    const id: string = req.params.id;
    const postData = {
      title: req.body.title,
      description: req.body.description
    }

    try {
      await PostsModel.findOneAndUpdate({ _id: id }, { title: postData.title, description: postData.description }, {
        new: true,
        upsert: true
      }, (err, post) => {
        if (err) {
          return res.status(400).json({
            status: 'error',
            message: err
          })
        }

        if (!post) return res.status(404).json({
          status: 'error',
          error: 'Такого поста не существует!'
        });

        return res.status(200).json({
          status: 'success',
        });
      })
    } catch (error) {
      res.status(500).json({
        status: 'error',
        error
      })
    }
  }

  updateClaps = async (req: express.Request, res: express.Response) => {
    const id: string = req.params.id;

    try {
      await PostsModel.findOneAndUpdate({ _id: id }, { $inc: { 'claps': 0.5 } }, { new: true }, (err, post) => {
        if (err) {
          return res.status(400).json({
            status: 'error',
            message: err
          })
        }

        if (!post) return res.status(404).json({
          status: 'error',
          error: 'Такого поста не существует!'
        });

        return res.status(200).json({
          status: 'success',
        });
      })
    } catch (error) {
      res.status(500).json({
        status: 'error',
        error
      })
    }
  }

  index = async (req: express.Request, res: express.Response) => {
    try {
      await PostsModel.find({}, (err, posts: IPosts) => {
        if (err) {
          return res.status(400).json({
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
      return res.status(400).json({
        status: 'error',
        error
      })
    }
  }
}

export default PostsController;