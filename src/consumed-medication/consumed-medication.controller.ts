import { Controller, Get } from '@nestjs/common';
import { ConsumedMedication } from './consumed-medication.entity';
import { ConsumedMedicationService } from './consumed-medication.service';

@Controller('consumed-medications')
export class ConsumedMedicationController {
    constructor(private consumedMedicationsService: ConsumedMedicationService) { }

    @Get()
    async findAll(): Promise<ConsumedMedication[]> {
        return await this.consumedMedicationsService.findAll();
    }
}
