import { Test, TestingModule } from '@nestjs/testing';
import { PlaceImagesController } from './place-images.controller';
import { PlaceImagesService } from './place-images.service';

describe('PlaceImagesController', () => {
  let controller: PlaceImagesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlaceImagesController],
      providers: [PlaceImagesService],
    }).compile();

    controller = module.get<PlaceImagesController>(PlaceImagesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
