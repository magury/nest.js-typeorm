import {CallHandler, ExecutionContext, Injectable, NestInterceptor} from "@nestjs/common";
import {map, Observable} from "rxjs";

@Injectable()
export class reportInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        return next.handle().pipe(map((data) => {
            const statusCode = data.code
            let message = ''
            switch (statusCode) {
                case 200:
                    message = 'you are successful!'
                    break
                case 400:
                    message = 'there is a problem with your operation!'
                    break
                case 500:
                    message = 'Your network is not in good shape, please try again later!'
            }
            return {
                statusCode, message,
                result: data.result
            }
        }))
    }

}