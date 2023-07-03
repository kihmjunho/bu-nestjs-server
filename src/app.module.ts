import { Module } from '@nestjs/common';
import { AppConfigModule } from './config/appConfig.module';
import { DatabaseModule } from './config/database.module';
import { UserModule } from './user/user.module';
import { JwtAuthModule } from './config/jwt/jwtAuth.module';
import { CategoryModule } from './category/category.module';
import { ContentModule } from './content/content.module';

@Module({
  imports: [
    AppConfigModule,
    DatabaseModule,
    UserModule,
    JwtAuthModule,
    CategoryModule,
    ContentModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
