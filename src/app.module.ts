import { Module } from '@nestjs/common';
import { AppConfigModule } from './config/appConfig.module';
import { DatabaseModule } from './config/database.module';
import { UserModule } from './user/user.module';
import { JwtAuthModule } from './config/jwt/jwtAuth.module';
import { CategoryModule } from './category/category.module';
import { CreationModule } from './creation/creation.module';
import { UploadModule } from './upload/upload.module';
import { GuestbookModule } from './guestbook/guestbook.module';
import { CommentModule } from './comment/comment.module';

@Module({
  imports: [
    AppConfigModule,
    DatabaseModule,
    UserModule,
    JwtAuthModule,
    CategoryModule,
    CreationModule,
    UploadModule,
    GuestbookModule,
    CommentModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
