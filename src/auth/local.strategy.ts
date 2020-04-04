import { Strategy } from 'passport-local'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { AuthService } from './auth.service'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly authService: AuthService) {
        super()
    }

    async validate(data): Promise<any> {
        const user = await this.authService.validateUser(data)
        if (!user) {
            throw new UnauthorizedException({
                code: 401,
                message: 'Unauthuorized'
            })
        }
        return user
    }
}
