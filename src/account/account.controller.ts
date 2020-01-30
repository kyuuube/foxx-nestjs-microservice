import { Controller, Get, Logger } from '@nestjs/common'
import {
    Transport,
    ClientOptions,
    ClientProxy,
    ClientProxyFactory
} from '@nestjs/microservices'
import { AccountService } from './account.service'
import { ApiTags } from '@nestjs/swagger'

@Controller('account')
@ApiTags('account')
export class AccountController {
    private logger = new Logger('api-gateway')
    constructor(private readonly accountService: AccountService) {}

    @Get('/test')
    /**
     * test
     */
    public test() {
        this.logger.log('client request')
        return this.accountService.test()
    }
}
