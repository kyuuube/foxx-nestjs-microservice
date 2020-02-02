import { HttpException, Injectable, Body } from '@nestjs/common'
import { Transport } from '@nestjs/common/enums/transport.enum'
import { Client, ClientProxy } from '@nestjs/microservices'
import * as jwt from 'jsonwebtoken'

import { AuthConstants } from './account.constants'
import { IAccessToken, IAuthUser, TokenTypeEnum } from './account.interfaces'
@Injectable()
export class AccountService {
    @Client({
        options: { host: '127.0.0.1', port: 8877 },
        transport: Transport.TCP
    })
    public client: ClientProxy

    public async test() {
        const pattern = { cmd: 'sum' }
        const data = [1, 2, 3, 4, 5]
        return this.client
            .send<number>(pattern, data)
            .toPromise()
            .catch(error => {
                throw new HttpException(error, error.status)
            })
    }
    public async login(data) {
        return this.client
            .send({ cmd: 'login' }, data)
            .toPromise()
            .catch(error => {
                throw new HttpException(error, error.status)
            })
    }

    public validateAccessToken(token: string): IAccessToken {
        return jwt.verify(token, process.env.JWT_SECRET, {
            issuer: AuthConstants.access_token.options.issuer
        }) as IAccessToken
    }

    public createAccessTokenFromAuthUser(user: IAuthUser): string {
        const payload = {
            email: user.email,
            id: user.id,
            roles: [user.role],
            type: TokenTypeEnum.CLIENT
        }
        return jwt.sign(
            payload,
            process.env.JWT_SECRET,
            AuthConstants.access_token.options
        )
    }
}
