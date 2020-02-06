import {
    Controller,
    Get,
    Logger,
    Post,
    Body,
    UseGuards,
    Request,
    Put,
    Delete
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

    @Post('/user')
    @ApiOperation({ summary: '新增用户' })
    public signUp(@Body() createAuthUserDto: CreateAuthUserDto) {
        return this.accountService.signUp(createAuthUserDto)
    }

    @Put('/user')
    @ApiOperation({ summary: '修改用户' })
    public editUser(@Body() createAuthUserDto: CreateAuthUserDto) {
        return this.accountService.signUp(createAuthUserDto)
    }

    @Delete('/user')
    @ApiOperation({ summary: '删除用户' })
    public deteteUser(@Body() createAuthUserDto: CreateAuthUserDto) {
        return this.accountService.signUp(createAuthUserDto)
    }

    @Get('/list')
    @ApiOperation({ summary: '用户列表' })
    public getUserList(@Body() createAuthUserDto: CreateAuthUserDto) {
        return this.accountService.signUp(createAuthUserDto)
    }
}
