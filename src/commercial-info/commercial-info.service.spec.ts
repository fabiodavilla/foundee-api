import { Test, TestingModule } from '@nestjs/testing';
import { CommercialInfoService } from './commercial-info.service';

describe('CommercialInfoService', () => {
  let service: CommercialInfoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CommercialInfoService],
    }).compile();

    service = module.get<CommercialInfoService>(CommercialInfoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
