import { Controller, Logger, Post, Body, UseGuards, HttpCode, HttpStatus } from '@nestjs/common'
import { AuthService } from './auth.service'
import { ApiTags, ApiOperation } from '@nestjs/swagger'
import { CreateAuthUserDto } from '../account/dto/account.dto'

import { IAuthUser } from '../account/account.interfaces'

@Controller('auth')
@ApiTags('auth')
export class AuthController {
    private logger = new Logger('api-gateway')
    constructor(private readonly authService: AuthService) {}

    @Post('/login')
    @ApiOperation({ summary: '账号登录' })
    public async login(
        @Body() createAuthUserDto: CreateAuthUserDto
    ): Promise<{ user?: IAuthUser; token?: string, code?: number }> {
        const user: IAuthUser = await this.authService.validateUser(
            createAuthUserDto
        )
        const token = this.authService.createAccessTokenFromAuthUser(user)
        return {
            user,
            token
        }
    }

    @Post('/logout')
    @ApiOperation({ summary: '退出登录' })
    public logout() {
        this.logger.log('log out')
    }
}
