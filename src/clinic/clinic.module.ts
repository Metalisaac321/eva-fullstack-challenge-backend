import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Clinic } from './clinic.entity';
import { ClinicService } from './clinic.service';
import { ClinicController } from './clinic.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Clinic])],
    providers: [ClinicService],
    exports: [ClinicService],
    controllers: [ClinicController]
})
export class ClinicModule { }
