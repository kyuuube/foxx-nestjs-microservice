import { HttpException, Injectable, Logger, HttpStatus } from '@nestjs/common'
import { Transport } from '@nestjs/common/enums/transport.enum'
import { Client, ClientProxy } from '@nestjs/microservices'
import { CreateAuthUserDto } from '../account/dto/account.dto'
@Injectable()
export class AccountService {
    @Client({
        options: { host: '127.0.0.1', port: 8877 },
        transport: Transport.TCP
    })
    public client: ClientProxy

    private logger = new Logger('api-gateway-account-service')

    public async signUp(data: CreateAuthUserDto) {
        return this.client
            .send({ cmd: 'signUp' }, data)
            .toPromise()
            .catch(error => {
                throw new HttpException(error.message, HttpStatus.FORBIDDEN)
            })
    }

    public async getUserList(data: any) {
        return this.client.send({ cmd: 'user list' }, data).toPromise()
    }

    public async deleteUser(id: number) {
        return this.client
            .send({ cmd: 'del user' }, id)
            .toPromise()
            .catch(error => {
                throw new HttpException(error.message, HttpStatus.FORBIDDEN)
            })
    }

    public async editUser(data: CreateAuthUserDto) {
        return this.client
            .send({ cmd: 'edit user' }, data)
            .toPromise()
            .catch(error => {
                throw new HttpException(error.message, HttpStatus.FORBIDDEN)
            })
    }

    public async userDetail(id: number) {
        return this.client
            .send({ cmd: 'user detail' }, id)
            .toPromise()
            .catch(error => {
                throw new HttpException(error.message, HttpStatus.FORBIDDEN)
            })
    }
}
