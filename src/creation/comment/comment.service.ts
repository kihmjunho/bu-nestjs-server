import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class CommentService {
  constructor() {}

  async getComment(id: string) {
    console.log(id);
  }
  // async create(createArtworkRequestDto: CreateArtworkRequestDto) {
  //   const artwork = this.artworkFactory.create(createArtworkRequestDto);
  //   const data = await this.artworkRepository.save(artwork);
  //
  //   return new CreateContentResponseDto(data.id);
  // }
  //
  // async findAll() {
  //   return await this.artworkRepository.findAll();
  // }
  //
  // async findOne(id: string): Promise<GetArtworkParamResponseDto> {
  //   const response: Artwork | null = await this.artworkRepository.findOneById(
  //     id,
  //   );
  //   console.log(response);
  //   if (!response) throw new Error('error');
  //
  //   return new GetArtworkParamResponseDto(response);
  // }
}
