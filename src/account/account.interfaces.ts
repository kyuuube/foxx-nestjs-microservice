export interface IAuthUser {
    createdAt?: Date
    email: string
    id: number
    updatedAt?: Date
}

export interface IAccessToken {
    readonly email: string
    readonly exp: number
    readonly iat: number
    readonly id: number
    readonly iss: number
    readonly type: TokenTypeEnum
}

export enum TokenTypeEnum {
    CLIENT,
    SYSTEM
}
