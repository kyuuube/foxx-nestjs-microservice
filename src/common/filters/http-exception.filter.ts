import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    Logger,
    HttpStatus
} from '@nestjs/common'
import { Request, Response } from 'express'

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    private logger = new Logger('api-gateway-exception-filter')
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp()
        const response = ctx.getResponse<Response>()
        const request = ctx.getRequest<Request>()
        const message = exception.message

        if (message && message.statusCode && message.statusCode === 401) {
            return response.status(HttpStatus.OK).json({
                msg: message.error,
                code: 401,
                timestamp: new Date().toISOString(),
                path: request.url
            })
        }

        response.status(HttpStatus.OK).json({
            msg: message.message,
            code: message.code,
            timestamp: new Date().toISOString(),
            path: request.url
        })
    }
}
