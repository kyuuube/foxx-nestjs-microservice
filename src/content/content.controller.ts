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
import { ContentPaginationDto } from './dto/content.pagination.dto'
import { ContentDto } from './dto/content.dto'
import { AuthGuard } from '@nestjs/passport'
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger'

@Controller('content')
@ApiTags('content')
export class ContentController {
    private logger = new Logger('api-gateway')
    constructor(private readonly contentService: ContentService) {}

    @Get('/list')
    @ApiOperation({ summary: '获取用户文章列表' })
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    public loadContentDetail(@Query() params: ContentPaginationDto, @Request() req) {
        return this.contentService.loadContentList({...params, authorId: req.user.id})
    }

    @Post('/create')
    @ApiOperation({ summary: '创建文章' })
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    public createContent(@Body() dto: ContentDto, @Request() req) {
        return this.contentService.createContent({...dto, authorId: req.user.id})
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
    public contentDetail(@Param('id') id: string, @Request() req) {
        return this.contentService.contentDetail({id, userId: req.user.id})
    }

    @Get('/posts')
    @ApiOperation({ summary: '文章列表' })
    public getPosts(@Query() params: ContentPaginationDto) {
        return this.contentService.getPosts(params)
    }
}
