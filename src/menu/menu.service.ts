import { HttpException, Injectable, Logger, HttpStatus } from '@nestjs/common'
import { Transport } from '@nestjs/common/enums/transport.enum'
import { Client, ClientProxy } from '@nestjs/microservices'
import { MenuDto } from './menu.dto'
import { PaginationDto } from '../common/dto/pagination.dto'

@Injectable()
export class MenuService {
  @Client({
    options: { host: '127.0.0.1', port: 8877 },
    transport: Transport.TCP
})
public client: ClientProxy

private logger = new Logger('api-gateway-account-service')
  public async createMenu(data: MenuDto) {
    return this.client
        .send({ cmd: 'create menu' }, data)
        .toPromise()
        .catch(error => {
            throw new HttpException(error.message, HttpStatus.FORBIDDEN)
        })
}
}
