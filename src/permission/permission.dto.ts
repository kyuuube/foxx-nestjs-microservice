import { ApiProperty } from '@nestjs/swagger'

export class PermissionDto {
    @ApiProperty({
        description: '权限ID',
        example: 'id',
        required: false,
        type: 'string'
    })
    public readonly id: string

    @ApiProperty({
        description: '权限名称',
        example: '新增用户',
        required: true,
        type: 'string'
    })
    public readonly name: string

    @ApiProperty({
        description: '描述',
        example: '',
        required: false,
        type: 'string'
    })
    public readonly description: string

    @ApiProperty({
        description: '接口',
        example: '/dashboard',
        required: false,
        type: 'string'
    })
    public readonly path: string

    @ApiProperty({
        description: '方法',
        example: '',
        required: false,
        type: 'string'
    })
    public readonly methods: string

    @ApiProperty({
        description: '类型',
        example: 0,
        required: false,
        type: 'number'
    })
    public readonly type: number

    @ApiProperty({
        description: '权限标识',
        example: 'adduser',
        required: false,
        type: 'string'
    })
    public readonly slug: string
}
