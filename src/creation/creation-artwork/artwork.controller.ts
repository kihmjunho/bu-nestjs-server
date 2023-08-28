import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateArtworkRequestDto } from '../dto/createArtwork.request.dto';
import { ArtworkCreationService } from './artwork.service';

@Controller('creations/artworks')
export class ArtworkCreationController {
  constructor(
    private readonly artworkCreationService: ArtworkCreationService,
  ) {}

  @Post()
  async createArtwork(
    @Body() createArtworkRequestDto: CreateArtworkRequestDto,
  ) {
    return await this.artworkCreationService.create(createArtworkRequestDto);
  }

  @Get()
  async findAll() {
    return await this.artworkCreationService.findAll();
  }

  @Get('/:id')
  async findOne(@Param('id') id: string) {
    return await this.artworkCreationService.findOne(id);
  }
}