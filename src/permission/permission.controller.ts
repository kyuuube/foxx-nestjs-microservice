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

@Controller('permission')
@ApiTags('权限')
export class PermissionController {
    private logger = new Logger('api-gateway')
    constructor(private readonly permissionService: PermissionService) {}

    @Post('/create')
    @ApiOperation({ summary: '创建菜单' })
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    public createMenu(@Body() dto: PermissionDto) {
        return this.permissionService.create(dto)
    }
}
