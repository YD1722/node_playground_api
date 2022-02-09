import { Request, Response, NextFunction } from 'express';

const jwt = require('jsonwebtoken');

const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[0];

  if (token == null) {
    return res.sendStatus(401);
  }

  jwt.verify(
    token,
    process.env.TOKEN_SECRET as string,
    (err: any, user: any) => {
      console.log(err);

      if (err) return res.sendStatus(403);
      next();
    }
  );
};

export { authenticateToken };
