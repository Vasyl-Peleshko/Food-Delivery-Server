import { Controller, Get, Param } from '@nestjs/common';
import { FoodDetailsService } from './food-details.service';
import { FoodItem } from 'src/schemas/food-item.schema';

@Controller('food-details')
export class FoodDetailsController {
  constructor(private readonly foodDetailsService: FoodDetailsService) {}

  @Get()
  async getAllProducts(): Promise<FoodItem[]> {
    return this.foodDetailsService.findAll();
  }

  @Get(':id')
  async getProductById(@Param('id') id: string): Promise<FoodItem | null> {
    return this.foodDetailsService.findOne(id);
  }
}
