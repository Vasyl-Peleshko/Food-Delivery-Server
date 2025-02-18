import { Controller, Get, Param, Query } from '@nestjs/common';
import { RestaurantService } from './restaurant.service';
import { Restaurant } from 'src/schemas/restaurant.schema';

@Controller('restaurants')
export class RestaurantController {
  constructor(private readonly restaurantService: RestaurantService) {}

  @Get()
  async findAll(
    @Query('name') name?: string,
    @Query('categories') categories?: string,
    @Query('rating') rating?: number,
    @Query('priceFrom') priceFrom?: number,
    @Query('priceTo') priceTo?: number,
    @Query('sortBy') sortBy?: string,
  ): Promise<Restaurant[]> {
    return this.restaurantService.findAll({
      name,
      categories,
      rating,
      priceFrom,
      priceTo,
      sortBy,
    });
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Restaurant | null> {
    return this.restaurantService.findById(id);
  }
}
