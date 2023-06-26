import { Module } from '@nestjs/common';
import { AppConfigModule } from './config/appConfig.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './config/database.module';
import { UserModule } from './user/user.module';
import { JwtAuthModule } from './config/jwt/jwtAuth.module';
import { CategoryModule } from './category/category.module';
import { PostModule } from './post/post.module';

@Module({
  imports: [
    AppConfigModule,
    DatabaseModule,
    UserModule,
    JwtAuthModule,
    CategoryModule,
    PostModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
