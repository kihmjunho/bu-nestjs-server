import {
  Controller,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';

@Controller('upload')
export class UploadController {
  // constructor() {} // private readonly uploadService: UploadService

  @Post()
  @UseInterceptors(FilesInterceptor('images'))
  uploadSingleFile(@UploadedFiles() images: Express.MulterS3.File[]) {
    return images.map((image) => image.location);
  }
}
