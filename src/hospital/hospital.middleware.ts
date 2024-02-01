import {Injectable, NestMiddleware} from "@nestjs/common";
import {NextFunction, Request, Response} from "express";
import {execute} from "../common";

@Injectable()
export class HospitalMiddleware implements NestMiddleware {
    async use(req: Request, res: Response, next: NextFunction): Promise<any> {
        // console.log(req.body)
        // 执行是不是有json
        // await execute(`select * from user where ?`)
            next()
    }
}