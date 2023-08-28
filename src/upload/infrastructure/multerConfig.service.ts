import { Injectable } from '@nestjs/common';
import {
  MulterModuleOptions,
  MulterOptionsFactory,
} from '@nestjs/platform-express';
import { S3Client } from '@aws-sdk/client-s3';
import * as multerS3 from 'multer-s3';

@Injectable()
export class MulterConfigService implements MulterOptionsFactory {
  createMulterOptions(): MulterModuleOptions {
    const s3 = new S3Client({
      region: 'ap-northeast-2',
      credentials: {
        accessKeyId: '??',
        secretAccessKey: '??',
      },
    });
    return {
      storage: multerS3({
        s3,
        bucket: 'puzzle-2',
        key: (req, file, cb) => {
          cb(null, Date.now() + '.' + file.originalname.split('.').pop());
        },
      }),
      limits: {
        fileSize: 1024 * 1024 * 10, // 10MB
      },
    };
  }
}
