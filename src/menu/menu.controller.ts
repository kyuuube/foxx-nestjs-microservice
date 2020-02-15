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
import { MenuService } from './menu.service'
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger'
import { MenuDto } from './menu.dto'
import { PaginationDto } from '../common/dto/pagination.dto'
import { AuthGuard } from '@nestjs/passport'

@Controller('menu')
@ApiTags('menu')
export class MenuController {
    private logger = new Logger('api-gateway')
    constructor(private readonly menuService: MenuService) {}

    @Post('/create')
    @ApiOperation({ summary: '创建菜单' })
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    public createMenu(@Body() dto: MenuDto) {
        return this.menuService.createMenu(dto)
    }

    @Put('/edit')
    @ApiOperation({ summary: '修改菜单' })
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    public editMenu(@Body() dto: MenuDto) {
        return this.menuService.editMenu(dto)
    }

    @Delete('/delete/:id')
    @ApiOperation({ summary: '删除菜单' })
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    public deleteMenu(@Param('id') id: string) {
        return this.menuService.deleteMenu(id)
    }

    @Get('/list')
    @ApiOperation({ summary: '获取菜单列表' })
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    public getMenuList(@Query() params: PaginationDto) {
        return this.menuService.getMenuList(params)
    }

    @Get('/detail/:id')
    @ApiOperation({ summary: '获取菜单详情' })
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    public getMenuDetail(@Param('id') id: string) {
        return this.menuService.menuDetail(id)
    }

    @Get('/tree')
    @ApiOperation({ summary: '获取菜单树' })
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    public getMenuTree() {
        return this.menuService.getMenuTree()
    }

    @Get('/user/tree')
    @ApiOperation({ summary: '获取当前用户菜单树' })
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    public getCurrentMenuTree() {
        return this.menuService.getCurrentTree()
    }
}
