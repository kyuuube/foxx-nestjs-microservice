import { Controller, Get, Logger, Post, Body, UseGuards } from '@nestjs/common'
import { AccountService } from './account.service'
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger'
import { CreateAuthUserDto } from './dto/account.dto'

import { IAccessToken, IAuthUser, TokenTypeEnum } from './auth.interfaces'
import { TokenRequirements } from './token-requirements.decorator'
import { Token } from './token.decorator'
import { TokenGuard } from './token.guard'
@Controller('account')
@ApiTags('account')
@UseGuards(TokenGuard)
export class AccountController {
    private logger = new Logger('api-gateway')
    constructor(private readonly accountService: AccountService) {}

    @Get('/test')
    @ApiBearerAuth()
    @ApiBearerAuth()
    @TokenRequirements(TokenTypeEnum.CLIENT, [])
    public test() {
        this.logger.log('client request')
        return this.accountService.test()
    }

    @Post('/login')
    @ApiOperation({ summary: '账号登录' })
    public login(@Body() createAuthUserDto: CreateAuthUserDto) {
        this.logger.log('log in')
        this.accountService.login('log in')
    }

    @Post('/logout')
    @ApiOperation({ summary: '退出登录' })
    public logout() {
        this.logger.log('log out')
    }

    @Post('/signUp')
    @ApiOperation({ summary: '用户注册' })
    public signUp() {
        this.logger.log('sign up')
    }
}
