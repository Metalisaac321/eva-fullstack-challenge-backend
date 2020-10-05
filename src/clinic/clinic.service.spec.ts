import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { getRepository, Repository } from 'typeorm';
import { createDbTestConnection } from '../utils/createDbTestConnection';
import { Clinic } from './clinic.entity';
import { ClinicService } from './clinic.service';

describe('ClinicService', () => {
  let service: ClinicService;
  let repository: Repository<Clinic>;
  let connection;
  const testConnectionName = 'testConnection';

  beforeEach(async () => {
    connection = await createDbTestConnection(testConnectionName, [Clinic]);
    await Test.createTestingModule({
      providers: [
        ClinicService,
        {
          provide: getRepositoryToken(Clinic),
          useClass: Repository,
        }
      ],
    }).compile();
    repository = getRepository(Clinic, testConnectionName)
    service = new ClinicService(repository);
  });

  afterEach(async () => {
    await connection.dropDatabase()
  })

  test('Should Save clinic', async () => {
    const clinicToSave: Clinic = {
      clinicId: 1,
      name: 'EXPLANADA',
    };
    const newClinic = await service.insert({
      name: 'EXPLANADA',
    });

    expect(newClinic).toStrictEqual(clinicToSave);
  })
});
