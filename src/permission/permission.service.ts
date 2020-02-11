import { HttpException, Injectable, Logger, HttpStatus } from '@nestjs/common'
import { Transport } from '@nestjs/common/enums/transport.enum'
import { Client, ClientProxy } from '@nestjs/microservices'
import { PermissionDto } from './permission.dto'
import { PaginationDto } from '../common/dto/pagination.dto'

@Injectable()
export class PermissionService {
    @Client({
        options: { host: '127.0.0.1', port: 8877 },
        transport: Transport.TCP
    })
    public client: ClientProxy

    private logger = new Logger('api-gateway-account-service')

    public async create(data: PermissionDto) {
        return this.client
            .send({ cmd: 'create perm' }, data)
            .toPromise()
            .catch(error => {
                throw new HttpException(error.message, HttpStatus.FORBIDDEN)
            })
    }

    public async edit(data: PermissionDto) {
        return this.client
            .send({ cmd: 'edit perm' }, data)
            .toPromise()
            .catch(error => {
                throw new HttpException(error.message, HttpStatus.FORBIDDEN)
            })
    }

    public async delete(id: string) {
        return this.client
            .send({ cmd: 'del perm' }, id)
            .toPromise()
            .catch(error => {
                throw new HttpException(error.message, HttpStatus.FORBIDDEN)
            })
    }

    public async detail(id: string) {
        return this.client
            .send({ cmd: 'perm detail' }, id)
            .toPromise()
            .catch(error => {
                throw new HttpException(error.message, HttpStatus.FORBIDDEN)
            })
    }

    public async getList(data: PaginationDto) {
        return this.client
            .send({ cmd: 'perm list' }, data)
            .toPromise()
            .catch(error => {
                throw new HttpException(error.message, HttpStatus.FORBIDDEN)
            })
    }
}
