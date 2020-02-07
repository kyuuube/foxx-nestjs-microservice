import { ApiProperty } from '@nestjs/swagger'

export class MenuDto {
    @ApiProperty({
        description: 'menu id',
        example: 'id',
        required: false,
        type: 'string'
    })
    public readonly id: string

    @ApiProperty({
        description: 'menu name',
        example: ' 工作台',
        required: true,
        type: 'string'
    })
    public readonly name: string

    @ApiProperty({
        description: 'menu description',
        example: 'dashboard',
        required: false,
        type: 'string'
    })
    public readonly description: string

    @ApiProperty({
        description: 'menu url',
        example: '/dashboard',
        required: false,
        type: 'string'
    })
    public readonly url: string

    @ApiProperty({
        description: 'menu icon',
        example: '',
        required: false,
        type: 'string'
    })
    public readonly icon: string

    @ApiProperty({
        description: 'parent id',
        example: '1',
        required: false,
        type: 'string'
    })
    public readonly parentId: string

    @ApiProperty({
        description: 'permissions list',
        example: '[1,2]',
        required: false,
        type: 'Array'
    })
    public readonly permissList: string[]
}
