import { ApiProperty } from '@nestjs/swagger'

export class PaginationDto {
    @ApiProperty({
        description: 'page',
        example: 1,
        required: true,
        type: 'number'
    })
    public readonly page: number

    @ApiProperty({
        description: 'page size',
        example: 10,
        required: true,
        type: 'number'
    })
    public readonly pageSize: number

    @ApiProperty({
        description: 'keywords',
        example: 'QB',
        required: false,
        type: 'string'
    })
    public readonly keywords: string
}
