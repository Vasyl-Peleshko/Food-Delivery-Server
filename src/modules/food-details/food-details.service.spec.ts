import { Test, TestingModule } from '@nestjs/testing';
import { FoodDetailsService } from './food-details.service';

describe('FoodDetailsService', () => {
  let service: FoodDetailsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FoodDetailsService],
    }).compile();

    service = module.get<FoodDetailsService>(FoodDetailsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
