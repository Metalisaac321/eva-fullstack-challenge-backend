import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Women } from './women.entity';
import { WomenService } from './women.service';

@Module({
  imports: [TypeOrmModule.forFeature([Women])],
  providers: [WomenService]
})
export class WomenModule { }
