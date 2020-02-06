import { ApiProperty } from '@nestjs/swagger'
import { Gender } from '../enum/gender.enum'

export class CreateAuthUserDto {
    @ApiProperty({
        description: 'User email',
        example: 'test@test.com',
        required: true,
        type: 'string'
    })
    public readonly email: string

    @ApiProperty({
        description: 'User password',
        example: 'password',
        required: true,
        type: 'string'
    })
    public readonly password: string

    @ApiProperty({
        description: 'User name',
        example: 'QB',
        required: true,
        type: 'string'
    })
    public readonly name: string

    @ApiProperty({
        description: 'User gender',
        example: 'male',
        required: false,
        type: 'string',
        enum: Gender
    })
    public readonly gender: Gender

    @ApiProperty({
        description: 'User profile photo',
        example: 'https://i.loli.net/2020/02/06/KVJBWRw4LD1teZI.jpg',
        required: false,
        type: 'string'
    })
    public readonly avatar: string
}
