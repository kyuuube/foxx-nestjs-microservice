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
import { RoleService } from './role.service'
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger'
import { RoleDto } from './role.dto'
import { PaginationDto } from '../common/dto/pagination.dto'
import { AuthGuard } from '@nestjs/passport'

@Controller('role')
@ApiTags('role')
export class RoleController {
    private logger = new Logger('api-gateway')
    constructor(private readonly roleService: RoleService) {}

    @Get('/list')
    @ApiOperation({ summary: '获取角色列表' })
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    public getRoleList(@Query() params: PaginationDto) {
        return this.roleService.getRoleList(params)
    }

    @Get('/detail/:id')
    @ApiOperation({ summary: '获取角色详情' })
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    public getRoleDetail(@Param('id') id: number) {
        return this.roleService.roleDetail(id)
    }

    @Post('/create')
    @ApiOperation({ summary: '创建角色' })
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    public createRole(@Body() dto: RoleDto) {
        return this.roleService.createRole(dto)
    }

    @Put('/edit')
    @ApiOperation({ summary: '修改角色' })
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    public editRole(@Body() dto: RoleDto) {
        return this.roleService.editRole(dto)
    }

    @Delete('/delete/:id')
    @ApiOperation({ summary: '删除角色' })
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    public deleteRole(@Param('id') id: number) {
        return this.roleService.deleteRole(id)
    }
}
