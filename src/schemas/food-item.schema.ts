import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

class Addon {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  countable: boolean;
}

@Schema()
export class FoodItem extends Document {
  @Prop({ required: true })
  id: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  rating: number;

  @Prop({ required: true })
  feedbacks: number;

  @Prop({ required: true })
  restaurantId: string;

  @Prop({ required: true })
  imgUrl: string;

  @Prop({ type: [String], required: false })
  ingredients?: string[];

  @Prop({ type: [Addon], required: false })
  addons?: Addon[];
}

export const FoodItemSchema = SchemaFactory.createForClass(FoodItem);
