import { Controller, Get, Logger } from '@nestjs/common'
import {
    Transport,
    ClientOptions,
    ClientProxy,
    ClientProxyFactory
} from '@nestjs/microservices'
import { ContentService } from './content.service'
import { ApiTags } from '@nestjs/swagger'

@Controller('content')
@ApiTags('content')
export class ContentController {
    private logger = new Logger('api-gateway')
    constructor(private readonly contentService: ContentService) {}

    @Get('/test')
    /**
     * test
     */
    public test() {
        this.logger.log('client request')
        return this.contentService.test()
    }
}
