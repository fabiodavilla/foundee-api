import { Test, TestingModule } from '@nestjs/testing';
import { PlaceCommentsController } from './place-comments.controller';
import { PlaceCommentsService } from './place-comments.service';

describe('PlaceCommentsController', () => {
  let controller: PlaceCommentsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlaceCommentsController],
      providers: [PlaceCommentsService],
    }).compile();

    controller = module.get<PlaceCommentsController>(PlaceCommentsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
