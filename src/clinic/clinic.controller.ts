import { Controller, Get } from '@nestjs/common';
import { Clinic } from './clinic.entity';
import { ClinicService } from './clinic.service';

@Controller('clinics')
export class ClinicController {
    constructor(private clinicService: ClinicService) { }

    @Get()
    async getClinics(): Promise<Clinic[]> {
        return await this.clinicService.findAll()
    }
}
