import { Injectable, NestMiddleware, Scope } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { NextFunction, Response } from 'express';
import { jwtConstants } from 'src/auth/constants';
import { ExtendedRequest } from '../types/extended-request';

@Injectable({ scope: Scope.REQUEST })
export class JwtMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}

  async use(req: ExtendedRequest, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.substring(7);

      try {
        const decoded = this.jwtService.verify(token, {
          publicKey: jwtConstants.secret,
        });

        req.userObject = { idUser: decoded.idUser, email: decoded.email };
        next();
      } catch (error) {
        res.status(401).json({ message: 'Invalid token' });
      }
    } else {
      res.status(401).json({ message: 'Token not specified' });
    }
  }
}
