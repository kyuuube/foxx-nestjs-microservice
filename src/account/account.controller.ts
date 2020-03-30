import {
    Controller,
    Get,
    Logger,
    Post,
    Body,
    UseGuards,
    Request,
    Put,
    Delete,
    Param,
    Query
} from '@nestjs/common'
import { AccountService } from './account.service'
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger'
import { CreateAuthUserDto } from './dto/account.dto'
import { PaginationDto } from '../common/dto/pagination.dto'
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
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    public editUser(@Body() createAuthUserDto: CreateAuthUserDto) {
        return this.accountService.editUser(createAuthUserDto)
    }

    @Delete('/user/:id')
    @ApiOperation({ summary: '删除用户' })
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    public deteteUser(@Param('id') id: number) {
        return this.accountService.deleteUser(id)
    }

    @Get('/list')
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @ApiOperation({ summary: '用户列表' })
    public getUserList(@Query() paginationDto: PaginationDto) {
        return this.accountService.getUserList(paginationDto)
    }

    @Get('/detail/:id')
    @ApiOperation({ summary: '用户详情' })
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    public getMenuDetail(@Param('id') id: number) {
        return this.accountService.userDetail(id)
    }
}
