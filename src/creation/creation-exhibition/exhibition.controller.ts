import { Body, Controller, Get, Param, Post, Request } from '@nestjs/common';
import { ExhibitionCreationService } from './exhibition.service';
import { CreateExhibitionRequestDto } from './createExhibition.request.dto';

@Controller('creations/exhibitions')
export class ExhibitionCreationController {
  constructor(
    private readonly exhibitionCreationService: ExhibitionCreationService,
  ) {}

  @Post()
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
  async findAll() {
    return await this.exhibitionCreationService.findAll();
  }

  @Get('/:id')
  async findOne(@Param('id') id: string) {
    return await this.exhibitionCreationService.findOne(id);
  }
}
