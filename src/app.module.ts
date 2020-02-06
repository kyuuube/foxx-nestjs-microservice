import { Module } from '@nestjs/common'
import { AccountModule } from './account/account.module'
import { ContentModule } from './content/content.module'
import { AuthModule } from './auth/auth.module'
@Module({
    imports: [AccountModule, ContentModule, AuthModule]
})
export class AppModule {}
