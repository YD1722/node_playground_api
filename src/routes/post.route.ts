import express, { Request, Response } from 'express';
import { Post } from '../models/post.model';

const router = express.Router();

router.get('/', (req: Request, res: Response) => {
  return res.send('yo bro');
});

router.get('/api/posts', (req: Request, res: Response) => {
  return res.send('get:posts');
});

router.post('/api/posts', async (req: Request, res: Response) => {
  const { title, body } = req.body;

  const post = Post.build({ title, body });

  try {
    await post.save();
  } catch (e) {
    console.log(e);
  }

  return res.status(201).send(post);
});

export { router as postRouter };
