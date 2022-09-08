import { Test, TestingModule } from '@nestjs/testing';
import { PlaceImagesService } from './place-images.service';

describe('PlaceImagesService', () => {
  let service: PlaceImagesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PlaceImagesService],
    }).compile();

    service = module.get<PlaceImagesService>(PlaceImagesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
