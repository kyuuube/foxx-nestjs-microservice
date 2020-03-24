import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AccountController } from './account.controller'
import { AccountService } from './account.service'
import { AuthModule } from '../auth/auth.module'
import { AuthUser } from './entity/auth.entity'
import { UserRole } from './entity/user.role.entity'

@Module({
    imports: [AuthModule, TypeOrmModule.forFeature([AuthUser, UserRole])],
    controllers: [AccountController],
    providers: [AccountService]
})
export class AccountModule {}
