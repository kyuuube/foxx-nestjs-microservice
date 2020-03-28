import { Catch, RpcExceptionFilter } from '@nestjs/common'
import { Observable, throwError } from 'rxjs'
import { RpcException } from '@nestjs/microservices'

@Catch(RpcException)
export class ExceptionFilter implements RpcExceptionFilter {
    catch(exception: RpcException): Observable<any> {
        console.log(exception)
        return throwError(exception.getError())
    }
}
