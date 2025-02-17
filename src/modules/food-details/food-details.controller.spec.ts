import { Test, TestingModule } from '@nestjs/testing';
import { FoodDetailsController } from './food-details.controller';
import { FoodDetailsService } from './food-details.service';

describe('FoodDetailsController', () => {
  let controller: FoodDetailsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FoodDetailsController],
      providers: [FoodDetailsService],
    }).compile();

    controller = module.get<FoodDetailsController>(FoodDetailsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
