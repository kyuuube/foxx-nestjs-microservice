import { HttpException, Injectable } from '@nestjs/common'
import { Transport } from '@nestjs/common/enums/transport.enum'
import { Client, ClientProxy } from '@nestjs/microservices'

@Injectable()
export class ContentService {
    @Client({
        options: { host: '127.0.0.1', port: 8877 },
        transport: Transport.TCP
    })
    public client: ClientProxy

    public async test() {
        const pattern = { cmd: 'sum' }
        const data = [1, 2, 3, 4, 5]
        return this.client
            .send<number>(pattern, data)
            .toPromise()
            .catch(error => {
                throw new HttpException(error, error.status)
            })
    }
}
