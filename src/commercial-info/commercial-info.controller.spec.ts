import { Test, TestingModule } from '@nestjs/testing';
import { CommercialInfoController } from './commercial-info.controller';
import { CommercialInfoService } from './commercial-info.service';

describe('CommercialInfoController', () => {
  let controller: CommercialInfoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CommercialInfoController],
      providers: [CommercialInfoService],
    }).compile();

    controller = module.get<CommercialInfoController>(CommercialInfoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
