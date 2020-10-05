import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Women } from './women.entity';
import { WomenService } from './women.service';
import { getRepository, Repository } from 'typeorm';
import { createDbTestConnection } from '../utils/createDbTestConnection';

describe('WomenService', () => {
  let service: WomenService;
  let repository: Repository<Women>;
  let connection;
  const testConnectionName = 'testConnection';

  beforeEach(async () => {
    connection = await createDbTestConnection(testConnectionName, [Women]);
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
    const womenToSave = {
      womenId: 0,
      email: 'emma@gmail.com',
      name: 'Emma'
    };
    const newWomen = await service.insert(womenToSave)

    expect(newWomen).toBe(womenToSave);

  })
});
