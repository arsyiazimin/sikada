import { Injectable, NestMiddleware } from '@nestjs/common';
import * as cls from 'cls-hooked';
import { RequestContext } from '../../subscriber/RequestContext';
import { Request, Response, NextFunction } from 'express';


@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  // resolve() {
  //   return (req, res, next) => {
  //     const requestContext = new RequestContext(req, res);
  //     const session = cls.getNamespace(RequestContext.nsid) || cls.createNamespace(RequestContext.nsid);
  //     session.run(async () => {
  //       session.set(RequestContext.name, requestContext);
  //       next();
  //     })
  //   }
  // }
  
  use(req: Request, res: any, next: NextFunction) {
    const requestContext = new RequestContext(req, res);
    const session = cls.getNamespace(RequestContext.nsid) || cls.createNamespace(RequestContext.nsid);
    session.run(async () => {
      session.set(RequestContext.name, requestContext);
      next();
    })
  }
}
