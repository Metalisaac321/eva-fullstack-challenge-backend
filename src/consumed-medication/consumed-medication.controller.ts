import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ConsumedMedication } from './consumed-medication.entity';
import { ConsumedMedicationService } from './consumed-medication.service';

@Controller('consumed-medications')
export class ConsumedMedicationController {
    constructor(private consumedMedicationsService: ConsumedMedicationService) { }

    /**
     *  Return all Consume dMedications for select filters in when page.
     */
    @UseGuards(JwtAuthGuard)
    @Get()
    async findAll(): Promise<ConsumedMedication[]> {
        return await this.consumedMedicationsService.findAll();
    }
}
