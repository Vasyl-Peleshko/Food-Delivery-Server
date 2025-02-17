import { Module } from '@nestjs/common';
import { FoodDetailsService } from './food-details.service';
import { FoodDetailsController } from './food-details.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { FoodItem, FoodItemSchema } from 'src/schemas/food-item.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: FoodItem.name, schema: FoodItemSchema },
    ]),
  ],
  controllers: [FoodDetailsController],
  providers: [FoodDetailsService],
  exports: [FoodDetailsService],
})
export class FoodDetailsModule {}
