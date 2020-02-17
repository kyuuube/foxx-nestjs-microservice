import { HttpException, Injectable, Logger, HttpStatus } from '@nestjs/common'
import { Transport } from '@nestjs/common/enums/transport.enum'
import { Client, ClientProxy } from '@nestjs/microservices'
import { RoleDto } from './role.dto'
import { PaginationDto } from '../common/dto/pagination.dto'

@Injectable()
export class RoleService {
    @Client({
        options: { host: '127.0.0.1', port: 8877 },
        transport: Transport.TCP
    })
    public client: ClientProxy

    private logger = new Logger('api-gateway-account-service')

    public async createRole(data: RoleDto) {
        return this.client
            .send({ cmd: 'create role' }, data)
            .toPromise()
            .catch(error => {
                throw new HttpException(error.message, HttpStatus.FORBIDDEN)
            })
    }
    public async editRole(data: RoleDto) {
        return this.client
            .send({ cmd: 'edit role' }, data)
            .toPromise()
            .catch(error => {
                throw new HttpException(error.message, HttpStatus.FORBIDDEN)
            })
    }

    public async deleteRole(id: number) {
        return this.client
            .send({ cmd: 'del role' }, id)
            .toPromise()
            .catch(error => {
                throw new HttpException(error.message, HttpStatus.FORBIDDEN)
            })
    }
    public async roleDetail(id: number) {
        return this.client
            .send({ cmd: 'role detail' }, id)
            .toPromise()
            .catch(error => {
                throw new HttpException(error.message, HttpStatus.FORBIDDEN)
            })
    }

    public async getRoleList(data: PaginationDto) {
        return this.client
            .send({ cmd: 'role list' }, data)
            .toPromise()
            .catch(error => {
                throw new HttpException(error.message, HttpStatus.FORBIDDEN)
            })
    }

    public async getCurrentPermissions(list: string[], user: any) {
        return this.client
        .send({ cmd: 'role permissions' }, {list, user})
        .toPromise()
        .catch(error => {
            throw new HttpException(error.message, HttpStatus.FORBIDDEN)
        })
    }
}
