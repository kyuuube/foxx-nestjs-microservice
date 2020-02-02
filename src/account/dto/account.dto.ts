import { ApiProperty } from '@nestjs/swagger'

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
}
