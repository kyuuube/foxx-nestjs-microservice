import {
    Controller,
    Get,
    Logger,
    Post,
    Body,
    UseGuards,
    Param,
    Put,
    Delete,
    Query
} from '@nestjs/common'
import { PermissionService } from './permission.service'
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger'
import { PermissionDto } from './permission.dto'
import { AuthGuard } from '@nestjs/passport'
import { PaginationDto } from '../common/dto/pagination.dto'

@Controller('permission')
@ApiTags('权限')
export class PermissionController {
    private logger = new Logger('api-gateway')
    constructor(private readonly permissionService: PermissionService) {}

    @Post('/create')
    @ApiOperation({ summary: '创建权限' })
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    public createMenu(@Body() dto: PermissionDto) {
        return this.permissionService.create(dto)
    }


    @Put('/edit')
    @ApiOperation({ summary: '修改权限' })
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    public editPerm(@Body() dto: PermissionDto) {
        return this.permissionService.edit(dto)
    }

    @Delete('/delete/:id')
    @ApiOperation({ summary: '删除权限' })
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    public deletePerm(@Param('id') id: string) {
        return this.permissionService.delete(id)
    }

    @Get('/list')
    @ApiOperation({ summary: '获取权限列表' })
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    public getPermList(@Query() params: PaginationDto) {
        return this.permissionService.getList(params)
    }

    @Get('/detail/:id')
    @ApiOperation({ summary: '获取权限详情' })
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    public getPermDetail(@Param('id') id: string) {
        return this.permissionService.detail(id)
    }
}
