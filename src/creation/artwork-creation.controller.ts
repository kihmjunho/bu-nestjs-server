import { Body, Controller, Post } from '@nestjs/common';
import { CreateArtworkRequestDto } from './dto/createArtwork.request.dto';
import { ArtworkCreationService } from './artwork-creation.service';

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
}
