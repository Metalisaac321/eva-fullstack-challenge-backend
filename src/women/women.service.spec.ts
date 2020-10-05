import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Women } from './women.entity';
import { WomenService } from './women.service';
import { getRepository, Repository } from 'typeorm';
import { createDbTestConnection } from '../utils/createDbTestConnection';
import { INSERT_WOMEN_TEST_CASE } from './constants';

describe('WomenService', () => {
  let service: WomenService;
  let repository: Repository<Women>;
  let connection;
  const testConnectionName = 'testConnection';

  beforeEach(async () => {
    connection = await createDbTestConnection(
      testConnectionName,
    );
    await Test.createTestingModule({
      providers: [
        WomenService,
        {
          provide: getRepositoryToken(Women),
          useClass: Repository,
        }
      ],
    }).compile();
    repository = getRepository(Women, testConnectionName)
    service = new WomenService(repository);
  });

  afterEach(async () => {
    await connection.dropDatabase()
  })

  test('Should Save Women', async () => {
    const newWomen = await service.insert(INSERT_WOMEN_TEST_CASE)
    expect(newWomen).toBe(INSERT_WOMEN_TEST_CASE);
  })
});
