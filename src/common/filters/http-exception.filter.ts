import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    Logger
} from '@nestjs/common'
import { Request, Response } from 'express'

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    private logger = new Logger('api-gateway-account-service')
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp()
        const response = ctx.getResponse<Response>()
        const request = ctx.getRequest<Request>()
        const errMsg = exception.message
        console.log(errMsg)
        response.status(errMsg.status).json({
            msg: errMsg.message,
            code: errMsg.status,
            timestamp: new Date().toISOString(),
            path: request.url
        })
    }
}
