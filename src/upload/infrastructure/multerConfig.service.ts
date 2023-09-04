import { Injectable } from '@nestjs/common';
import {
  MulterModuleOptions,
  MulterOptionsFactory,
} from '@nestjs/platform-express';
import { S3Client } from '@aws-sdk/client-s3';
import * as multerS3 from 'multer-s3';
import * as process from 'process';

@Injectable()
export class MulterConfigService implements MulterOptionsFactory {
  createMulterOptions(): MulterModuleOptions {
    const s3 = new S3Client({
      region: process.env.AWS_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
      },
    });
    return {
      storage: multerS3({
        s3,
        bucket: process.env.AWS_BUCKET || '',
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
