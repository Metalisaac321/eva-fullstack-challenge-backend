import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Clinic } from './clinic.entity';
import { ClinicService } from './clinic.service';

@Controller('clinics')
export class ClinicController {
    constructor(private clinicService: ClinicService) { }

    @UseGuards(JwtAuthGuard)
    @Get()
    async getClinics(): Promise<Clinic[]> {
        return await this.clinicService.findAll()
    }
}
