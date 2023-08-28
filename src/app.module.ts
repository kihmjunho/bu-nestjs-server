import { Module } from '@nestjs/common';
import { AppConfigModule } from './config/appConfig.module';
import { DatabaseModule } from './config/database.module';
import { UserModule } from './user/user.module';
import { JwtAuthModule } from './config/jwt/jwtAuth.module';
import { CategoryModule } from './category/category.module';
import { CreationModule } from './creation/creation.module';

@Module({
  imports: [
    AppConfigModule,
    DatabaseModule,
    UserModule,
    JwtAuthModule,
    CategoryModule,
    CreationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
