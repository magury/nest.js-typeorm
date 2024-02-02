import {CallHandler, ExecutionContext, Injectable, NestInterceptor} from "@nestjs/common";
import {map, Observable, tap} from "rxjs";

interface data {
    code: Number,
    result: {
        affectedRows: Number,
        message: String,

    }
}

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const ctx = context.switchToHttp()
        const res = ctx.getResponse()
        return next
            .handle()
            .pipe(
                map((data) => {
                    if (!data)
                        return {
                            statusCode: 200,
                            message: 'test successful',
                            result: null
                        }
                    const statusCode = data.code ?? 300
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
                            break
                    }
                    return {
                        statusCode,
                        message,
                        result: data.result
                    }
                })
            );
    }

}