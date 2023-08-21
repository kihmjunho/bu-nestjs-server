import { Controller, Get, Param, Query } from '@nestjs/common';
import { CreationService } from './creation.service';
import { GetOneParamRequestDto } from './dto/getOne.param.request.dto';
import { Content } from './entities/content.entity';
import { GetOneQueryRequestDto } from './dto/getOne.query.request.dto';

@Controller('creations')
export class CreationController {
  constructor(private readonly creationService: CreationService) {}

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
