import { Module } from '@nestjs/common'
import { AccountModule } from './account/account.module'
import { ContentModule } from './content/content.module'
import { AuthModule } from './auth/auth.module'
import { RoleModule } from './role/role.module'
import { MenuModule } from './menu/menu.module';
@Module({
    imports: [AccountModule, ContentModule, AuthModule, RoleModule, MenuModule]
})
export class AppModule {}
