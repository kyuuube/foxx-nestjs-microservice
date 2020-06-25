import { HttpException, Injectable, HttpStatus } from '@nestjs/common'
import { Transport } from '@nestjs/common/enums/transport.enum'
import { Client, ClientProxy } from '@nestjs/microservices'
import { PaginationDto } from '../common/dto/pagination.dto'
import { ContentDto } from '../content/content.dto'

@Injectable()
export class ContentService {
    @Client({
        options: { host: '127.0.0.1', port: 8878 },
        transport: Transport.TCP
    })
    public client: ClientProxy

    public async loadContentList(data: PaginationDto) {
        return this.client
            .send({ cmd: 'content list' }, data)
            .toPromise()
            .catch(error => {
                throw new HttpException(error.message, HttpStatus.FORBIDDEN)
            })
    }

    public async createContent(data: ContentDto) {
        return this.client
            .send({ cmd: 'create post' }, data)
            .toPromise()
            .catch(error => {
                throw new HttpException(error.message, HttpStatus.FORBIDDEN)
            })
    }

    public async editContent(data: ContentDto) {
        return this.client
            .send({ cmd: 'edit post' }, data)
            .toPromise()
            .catch(error => {
                throw new HttpException(error.message, HttpStatus.FORBIDDEN)
            })
    }

    public async deleteContent(id: string) {
        return this.client
            .send({ cmd: 'del post' }, id)
            .toPromise()
            .catch(error => {
                throw new HttpException(error.message, HttpStatus.FORBIDDEN)
            })
    }

    public async contentDetail(id: string) {
        return this.client
            .send({ cmd: 'post detail' }, id)
            .toPromise()
            .catch(error => {
                throw new HttpException(error.message, HttpStatus.FORBIDDEN)
            })
    }
}
