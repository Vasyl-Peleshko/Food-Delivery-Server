import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FoodItem } from 'src/schemas/food-item.schema';

@Injectable()
export class FoodDetailsService {
  constructor(
    @InjectModel(FoodItem.name) private productModel: Model<FoodItem>,
  ) {}

  async findAll(): Promise<FoodItem[]> {
    return this.productModel.find().exec();
  }

  async findOne(id: string): Promise<FoodItem | null> {
    return this.productModel.findOne({ id }).exec();
  }
}
