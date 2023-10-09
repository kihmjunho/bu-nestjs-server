import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ExhibitionCreationService } from './exhibition.service';
import { CreateExhibitionRequestDto } from './createExhibition.request.dto';
import { JwtAuthGuard } from '../../config/jwt/jwtAuth.guard';

@Controller('creations/exhibitions')
export class ExhibitionCreationController {
  constructor(
    private readonly exhibitionCreationService: ExhibitionCreationService,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async createExhibition(
    @Request() req: any,
    @Body() createExhibitionRequestDto: CreateExhibitionRequestDto,
  ) {
    const { id } = req.user;
    return await this.exhibitionCreationService.create(
      createExhibitionRequestDto,
      id,
    );
  }

  @Get()
  async findByCategoryName(@Query('category-name') categoryName: string) {
    return await this.exhibitionCreationService.findByCategoryName(
      categoryName,
    );
  }

  @Get('/:id')
  async findOne(@Param('id') id: string) {
    return await this.exhibitionCreationService.findOne(id);
  }
}
