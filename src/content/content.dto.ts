import { ApiProperty } from '@nestjs/swagger'

export class ContentDto {
    @ApiProperty({
        description: 'content id',
        example: 'id',
        required: false,
        type: 'string'
    })
    public readonly id: string

    @ApiProperty({
        description: 'content name',
        example: '文章标题',
        required: true,
        type: 'string'
    })
    public readonly title: string

    @ApiProperty({
        description: 'content',
        example: 'content',
        required: false,
        type: 'string'
    })
    public readonly content: string
}
