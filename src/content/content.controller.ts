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
    Query,
    Request
} from '@nestjs/common'
import { ContentService } from './content.service'
import { PaginationDto } from '../common/dto/pagination.dto'
import { ContentDto } from '../content/content.dto'
import { AuthGuard } from '@nestjs/passport'
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger'

@Controller('content')
@ApiTags('content')
export class ContentController {
    private logger = new Logger('api-gateway')
    constructor(private readonly contentService: ContentService) {}

    @Get('/list')
    @ApiOperation({ summary: '获取菜单列表' })
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    /**
     * list
     */
    public loadContentDetail(@Query() params: PaginationDto) {
        return this.contentService.loadContentList(params)
    }

    @Post('/create')
    @ApiOperation({ summary: '创建文章' })
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    public createContent(@Body() dto: ContentDto) {
        return this.contentService.createContent(dto)
    }

    @Put('/edit')
    @ApiOperation({ summary: '修改文章' })
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    public editContent(@Body() dto: ContentDto) {
        return this.contentService.editContent(dto)
    }

    @Delete('/delete/:id')
    @ApiOperation({ summary: '删除文章' })
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    public deleteContent(@Param('id') id: string) {
        return this.contentService.deleteContent(id)
    }

    @Get('/detail/:id')
    @ApiOperation({ summary: '文章' })
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    public contentDetail(@Param('id') id: string) {
        return this.contentService.contentDetail(id)
    }
}
