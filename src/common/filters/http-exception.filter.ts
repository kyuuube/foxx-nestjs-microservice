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
    private logger = new Logger('api-gateway-exception-filter')
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp()
        const response = ctx.getResponse<Response>()
        const request = ctx.getRequest<Request>()
        const errMsg = exception.message
        this.logger.log(errMsg)

        response
            .status(errMsg.status ? errMsg.status : errMsg.statusCode)
            .json({
                msg: errMsg.message,
                code: errMsg.status ? errMsg.status : errMsg.statusCode,
                timestamp: new Date().toISOString(),
                path: request.url
            })
    }
}
