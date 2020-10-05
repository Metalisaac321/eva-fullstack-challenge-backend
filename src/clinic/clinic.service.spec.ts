import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { getRepository, Repository } from 'typeorm';
import { createDbTestConnection } from '../utils/createDbTestConnection';
import { Clinic } from './clinic.entity';
import { ClinicService } from './clinic.service';
import { INSERT_CLINIC_TEST_CASE } from './constants';

describe('ClinicService', () => {
  let service: ClinicService;
  let repository: Repository<Clinic>;
  let connection;
  const testConnectionName = 'testConnection';

  beforeAll(async () => {
    connection = await createDbTestConnection(testConnectionName);
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

  afterAll(async () => {
    await connection.dropDatabase()
  })

  test('Should Save clinic', async () => {

    await service.insert({
      name: INSERT_CLINIC_TEST_CASE.name,
    });

    await service.insert({
      name: INSERT_CLINIC_TEST_CASE.name,
    });
    const clinics = await repository.find();
    expect(clinics.length).toBe(1);
    expect(clinics[0]).toEqual(INSERT_CLINIC_TEST_CASE);
  })
});
