import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export interface IFoodItem {
  name: string;
  price: number;
  category: string;
}

@Schema()
export class FoodItem extends Document implements IFoodItem {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  category: string;
}

export const FoodItemSchema = SchemaFactory.createForClass(FoodItem);
