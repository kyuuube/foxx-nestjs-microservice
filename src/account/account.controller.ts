import {
    Controller,
    Get,
    Logger,
    Post,
    Body,
    UseGuards,
    HttpCode,
    HttpStatus
} from '@nestjs/common'
import { AccountService } from './account.service'
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger'
import { CreateAuthUserDto } from './dto/account.dto'

import {
    IAccessToken,
    IAuthUser,
    TokenTypeEnum,
} from './account.interfaces'
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
    @TokenRequirements(TokenTypeEnum.CLIENT)
    public test() {
        this.logger.log('client request')
        return this.accountService.test()
    }

    @Post('/login')
    @ApiOperation({ summary: '账号登录' })
    public async login(
        @Body() createAuthUserDto: CreateAuthUserDto
    ): Promise<{ user: IAuthUser; token: string }> {
        const user:IAuthUser = await this.accountService.validateUser(createAuthUserDto)
        const token = this.accountService.createAccessTokenFromAuthUser(user)
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

    @Post('/signUp')
    @ApiOperation({ summary: '用户注册' })
    public signUp(@Body() createAuthUserDto: CreateAuthUserDto) {
        return this.accountService.signUp(createAuthUserDto)
    }
}
