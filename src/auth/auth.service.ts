import { HttpException, Injectable, Logger, HttpStatus } from '@nestjs/common'
import { Transport } from '@nestjs/common/enums/transport.enum'
import { Client, ClientProxy } from '@nestjs/microservices'
import * as jwt from 'jsonwebtoken'
import { JwtService } from '@nestjs/jwt'

import { AuthConstants } from '../account/account.constants'

import { IAccessToken, IAuthUser } from '../account/account.interfaces'

@Injectable()
export class AuthService {
    @Client({
        options: { host: '127.0.0.1', port: 8877 },
        transport: Transport.TCP
    })
    public client: ClientProxy

    constructor(private readonly jwtService: JwtService) {}

    private logger = new Logger('api-gateway-account-service')
    public async validateUser(data) {
        return this.client
            .send({ cmd: 'validateUser' }, data)
            .toPromise()
            .catch(error => {
                throw new HttpException(error.message, HttpStatus.FORBIDDEN)
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
        }
        return this.jwtService.sign(payload)
    }
}
