import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class CorsMiddleware implements NestMiddleware {
    // resolve() {
    //     return (req, res, next) => {
    //         let allowedOrigins = ["*"];
    //         if (allowedOrigins.indexOf(req.header("Origin")) == -1) {
    //             res.header("Access-Control-Allow-Origin", req.header("*"));
    //             res.header("Access-Control-Allow-Headers", "content-type, X-Requested-With, Accept, X-Access-Token,Authorization");
    //             res.header("Access-Control-Allow-Methods", "POST, GET, PUT, PATCH, OPTIONS");
    //         }
    //         next();
    //     };
    // }

    use(req: Request, res: any, next: NextFunction) {
        let allowedOrigins = ["*"];
        if (allowedOrigins.indexOf(req.header("Origin")) == -1) {
            res.header("Access-Control-Allow-Origin", req.header("*"));
            res.header("Access-Control-Allow-Headers", "content-type, X-Requested-With, Accept, X-Access-Token,Authorization");
            res.header("Access-Control-Allow-Methods", "POST, GET, PUT, PATCH, OPTIONS");
        }
        next();
    }
}