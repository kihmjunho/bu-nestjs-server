import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CreateArtworkRequestDto } from './createArtwork.request.dto';
import { ArtworkCreationService } from './artwork.service';
import { GetArtworkParamResponseDto } from './getArtwork.param.response.dto';
import { UpdateArtworkRequestDto } from './updateArtwork.request.dto';
import { JwtAuthGuard } from '../../config/jwt/jwtAuth.guard';

@Controller('creations/artworks')
export class ArtworkCreationController {
  constructor(
    private readonly artworkCreationService: ArtworkCreationService,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async createArtwork(
    @Request() req: any,
    @Body() createArtworkRequestDto: CreateArtworkRequestDto,
  ) {
    const { id } = req.user;
    return await this.artworkCreationService.create(
      createArtworkRequestDto,
      id,
    );
  }

  @Get()
  async findAll() {
    return await this.artworkCreationService.findAll();
  }

  @Get('/:id')
  async findOne(@Param('id') id: string): Promise<GetArtworkParamResponseDto> {
    return await this.artworkCreationService.findOne(id);
  }

  @Put('/:id')
  async updateArtwork(
    @Param('id') id: string,
    @Body() updateArtworkRequestDto: UpdateArtworkRequestDto,
  ) {
    return await this.artworkCreationService.update(
      id,
      updateArtworkRequestDto,
    );
  }

  @Delete('/:id')
  async deleteArtwork(@Param('id') id: string) {
    console.log('controller', id);
    return this.artworkCreationService.deleteArtwork(id);
  }
}
