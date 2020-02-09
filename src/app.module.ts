import { Module } from '@nestjs/common'
import { AccountModule } from './account/account.module'
import { ContentModule } from './content/content.module'
import { AuthModule } from './auth/auth.module'
import { RoleModule } from './role/role.module'
import { MenuModule } from './menu/menu.module'
import { PermissionModule } from './permission/permission.module'
@Module({
    imports: [
        AccountModule,
        ContentModule,
        AuthModule,
        RoleModule,
        MenuModule,
        PermissionModule
    ]
})
export class AppModule {}
