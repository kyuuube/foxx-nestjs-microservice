import { ApiProperty } from '@nestjs/swagger'

export class RoleDto {
    @ApiProperty({
        description: 'role id',
        example: 'id',
        required: false,
        type: 'number'
    })
    public readonly id: number

    @ApiProperty({
        description: 'role name',
        example: 'developer',
        required: true,
        type: 'string'
    })
    public readonly name: string

    @ApiProperty({
        description: 'Role description',
        example: 'font end developer',
        required: false,
        type: 'string'
    })
    public readonly description: string

    @ApiProperty({
        description: 'Role status',
        example: 'disable',
        required: false,
        type: 'string'
    })
    public readonly status: string

    @ApiProperty({
        description: 'permissions list',
        example: '[1,2]',
        required: false,
        type: 'Array'
    })
    public readonly permissList: string[]

    @ApiProperty({
        description: 'menus list',
        example: '[1,2]',
        required: false,
        type: 'Array'
    })
    public readonly menuList: string[]
}
