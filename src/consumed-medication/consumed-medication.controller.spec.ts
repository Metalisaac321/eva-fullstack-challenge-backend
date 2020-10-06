import { Test, TestingModule } from '@nestjs/testing';
import { ConsumedMedicationController } from './consumed-medication.controller';

describe('ConsumedMedicationController', () => {
  let controller: ConsumedMedicationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConsumedMedicationController],
    }).compile();

    controller = module.get<ConsumedMedicationController>(ConsumedMedicationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
