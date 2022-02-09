import jwt from 'jsonwebtoken';
import express, { Request, Response } from 'express';
import { User } from '../models/user.model';
import { authenticateToken } from './middleware';

const router = express.Router();

function generateAccessToken(payload: {}) {
  return jwt.sign(payload, process.env.TOKEN_SECRET as string, {
    expiresIn: '1800s',
  });
}

router.get('/users', (req, res) => {
  return res.send('yo bro yooo');
});

router.post('/api/user', async (req: Request, res: Response) => {
  try {
    const { userName, email, password } = req.body;

    await User.create({ userName, email, password });

    const token = generateAccessToken({ userName });
    return res.status(200).json(token);
  } catch (e) {
    // TODO : [YD] Implement rollbacks
    console.log(e);
    return res.status(500).send('Error user creating');
  }
});

router.get('/api/userOrders', authenticateToken, (req, res) => {
  return res.send('get:user orders');
});

export { router as userRouter };
