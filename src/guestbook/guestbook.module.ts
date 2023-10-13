import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Guestbook } from './guestbook.entity';
import { GuestbookController } from './guestbook.controller';
import { GuestbookService } from './guestbook.service';

@Module({
  imports: [TypeOrmModule.forFeature([Guestbook])],
  controllers: [GuestbookController],
  providers: [GuestbookService],
})
export class GuestbookModule {}
