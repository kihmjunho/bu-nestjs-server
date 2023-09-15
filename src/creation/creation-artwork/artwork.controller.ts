import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateArtworkRequestDto } from './createArtwork.request.dto';
import { ArtworkCreationService } from './artwork.service';
import { GetArtworkParamResponseDto } from './getArtwork.param.response.dto';

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
  async findOne(@Param('id') id: string): Promise<GetArtworkParamResponseDto> {
    // console.log('artwork', id);
    return await this.artworkCreationService.findOne(id);
  }

  @Get('/:id/comments')
  async getComments(@Param('id') id: string) {
    // console.log('artwork comment', id);
    return await this.artworkCreationService.findOne(id);
  }
}
