import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

class Addon {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  countable: boolean;
}

class Product {
  @Prop({ required: true })
  _id: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  quantity: number;

  @Prop({ required: true })
  imgUrl: string;

  @Prop({ required: true })
  rating: number;

  @Prop({ required: true })
  restaurantId: string;

  @Prop({ type: [String], required: true })
  ingredients: string[];

  @Prop({ type: [Addon], default: [] })
  addons: Addon[];
}

@Schema({ timestamps: true })
export class Order extends Document {
  _id: Types.ObjectId;

  @Prop({ required: true })
  userId: string;

  @Prop({ type: [Product], required: true })
  products: Product[];

  @Prop({ required: true })
  totalPrice: number;

  @Prop({ required: true, default: 'pending' })
  status: string;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
