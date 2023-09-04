import { MulterModule } from '@nestjs/platform-express';
import { MulterConfigService } from './infrastructure/multerConfig.service';
import { Module } from '@nestjs/common';
import { UploadController } from './upload.controller';

@Module({
  imports: [
    MulterModule.registerAsync({
      useClass: MulterConfigService,
    }),
  ],
  controllers: [UploadController],
})
export class UploadModule {}
