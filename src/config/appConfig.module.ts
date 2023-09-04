import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { EnvironmentVariable } from './environmentVariable.interface';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object<EnvironmentVariable>({
        PORT: Joi.number().required(),
        DB_HOST: Joi.string().required(),
        DB_PORT: Joi.number().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_NAME: Joi.string().required(),
        DB_SYNCHRONIZE: Joi.boolean().required(),
        DB_LOGGING: Joi.boolean().required(),
        JWT_SECRET: Joi.string().required(),
        AWS_REGION: Joi.string().required(),
        AWS_ACCESS_KEY_ID: Joi.string().required(),
        AWS_SECRET_ACCESS_KEY: Joi.string().required(),
        AWS_BUCKET: Joi.string().required(),
      }),
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppConfigModule {}
