import { HttpException, Injectable, HttpStatus, Logger } from '@nestjs/common'
import { Transport } from '@nestjs/common/enums/transport.enum'
import { Client, ClientProxy } from '@nestjs/microservices'
import { ContentPaginationDto } from './dto/content.pagination.dto'
import { ContentDto } from './dto/content.dto'

@Injectable()
export class ContentService {
    @Client({
        options: { host: '127.0.0.1', port: 8878 },
        transport: Transport.TCP
    })
    public client: ClientProxy

    private logger = new Logger('api-gateway')

    public async loadContentList(data: ContentPaginationDto) {
        return this.client
            .send({ cmd: 'content list' }, data)
            .toPromise()
            .catch(error => {
                this.logger.log(error)
                throw new HttpException(error.message, HttpStatus.FORBIDDEN)
            })
    }

    public async getPosts(data: ContentPaginationDto) {
        return this.client
            .send({ cmd: 'post list' }, data)
            .toPromise()
            .catch(error => {
                this.logger.log(error)
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

    public async contentDetail(params: any) {
        return this.client
            .send({ cmd: 'post detail' }, params)
            .toPromise()
            .catch(error => {
                throw new HttpException(error.message, HttpStatus.FORBIDDEN)
            })
    }
}
