import {
    Controller,
    Get,
    Logger,
    Post,
    Body,
    UseGuards,
    Request
} from '@nestjs/common'
import { AccountService } from './account.service'
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger'
import { CreateAuthUserDto } from './dto/account.dto'
import { AuthGuard } from '@nestjs/passport'

@Controller('account')
@ApiTags('account')
export class AccountController {
    private logger = new Logger('api-gateway')
    constructor(private readonly accountService: AccountService) {}

    @Get('/profile')
    @ApiOperation({ summary: '当前用户信息' })
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    getProfile(@Request() req) {
        return req.user
    }

    @Post('/signUp')
    @ApiOperation({ summary: '用户注册' })
    public signUp(@Body() createAuthUserDto: CreateAuthUserDto) {
        return this.accountService.signUp(createAuthUserDto)
    }
}
