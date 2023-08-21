import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { CreationService } from './creation.service';
import { GetOneParamRequestDto } from './dto/getOne.param.request.dto';
import { Content } from './entities/content.entity';
import { CreateArtworkRequestDto } from './dto/createArtwork.request.dto';
import { GetOneQueryRequestDto } from './dto/getOne.query.request.dto';
import { ArtworkCreationService } from './artwork-creation.service';

@Controller('creations')
export class CreationController {
  constructor(
    private readonly creationService: CreationService,
    private readonly artworkCreationService: ArtworkCreationService,
  ) {}

  // @Post()
  // async create(
  //   @Body()
  //   createContentRequestDto:
  //     | CreateContentRequestDto
  //     | CreateArtworkRequestDto
  //     | CreateExhibitionRequestDto,
  // ): Promise<Content> {
  //   return await this.creationService.create(createContentRequestDto);
  // }

  // TODO : Artwork 등록
  @Post('artworks')
  async createArtwork(
    @Body() createArtworkRequestDto: CreateArtworkRequestDto,
  ) {
    return await this.artworkCreationService.create(createArtworkRequestDto);
  }

  @Get()
  async getContents(): Promise<Content[]> {
    return await this.creationService.getAll();
  }

  @Get('/:id')
  async getOne(
    @Param() getOneParamRequestDto: GetOneParamRequestDto,
    @Query() getOneQueryRequestDto: GetOneQueryRequestDto,
  ): Promise<Content> {
    return await this.creationService.getOne(
      getOneParamRequestDto,
      getOneQueryRequestDto,
    );
  }
}
