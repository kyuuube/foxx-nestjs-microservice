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
  public createRole(@Body() dto: MenuDto) {
      return this.menuService.createMenu(dto)
  }
}
