import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ExhibitionCreationService } from './exhibition.service';
import { CreateExhibitionRequestDto } from '../dto-create/createExhibition.request.dto';

@Controller('creations/exhibitions')
export class ExhibitionCreationController {
  constructor(
    private readonly exhibitionCreationService: ExhibitionCreationService,
  ) {}

  @Post()
  async createArtwork(
    @Body() createExhibitionRequestDto: CreateExhibitionRequestDto,
  ) {
    return await this.exhibitionCreationService.create(
      createExhibitionRequestDto,
    );
  }

  @Get()
  async findAll() {
    return await this.exhibitionCreationService.findAll();
  }

  @Get('/:id')
  async findOne(@Param('id') id: string) {
    console.log(id);
    return await this.exhibitionCreationService.findOne(id);
  }
}
