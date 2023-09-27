import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Guest } from './guest.entity';
import { GuestController } from './guest.controller';
import { GuestService } from './guest.service';

@Module({
  imports: [TypeOrmModule.forFeature([Guest])],
  controllers: [GuestController],
  providers: [GuestService],
})
export class GuestModule {}
