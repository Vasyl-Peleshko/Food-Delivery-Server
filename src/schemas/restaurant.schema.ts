import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export interface IRestaurant {
  name: string;
  location: string;
}

@Schema()
export class Restaurant extends Document implements IRestaurant {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  location: string;
}

export const RestaurantSchema = SchemaFactory.createForClass(Restaurant);
