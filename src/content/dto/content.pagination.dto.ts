import { ApiProperty } from '@nestjs/swagger'
import { PaginationDto } from 'src/common/dto/pagination.dto'
import { PostStatus } from '../enum/post.status.enum'

export class ContentPaginationDto extends PaginationDto {
    @ApiProperty({
        description: 'content name',
        example: '文章标题',
        required: true,
        type: 'string'
    })
    public readonly title: string


    @ApiProperty({
        description: 'post status',
        example: 1,
        required: true,
        type: 'number',
        enum: PostStatus
    })
    public readonly status: PostStatus
}