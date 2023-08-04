import { Request, Response, NextFunction } from 'express';
import { verify, JwtPayload } from "jsonwebtoken";
import config from '../config';

// The CustomRequest interface enables us to provide JWTs to our controllers.
export interface CustomRequest extends Request {
  token: JwtPayload;
}

export const checkJwt = (req: Request, res: Response, next: NextFunction) => {
  const token: string = req.headers['authorization']!;
  let jwtPayload;



  try {
    jwtPayload = verify(token.split(' ')[1], config.jwt.secret!, {
      complete: true,
      audience: config.jwt.audience,
      issuer: config.jwt.issuer,
      algorithms: ['HS256'],
      clockTolerance: 0,
      ignoreExpiration: false,
      ignoreNotBefore: false
    });
    (req as CustomRequest).token = jwtPayload;
  } catch (error) {
    res.status(401).send({ message: 'Missing or invalid token' });
    return;
  }

  next();
}