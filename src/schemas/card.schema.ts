import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CardDocument = Card & Document;

@Schema({ timestamps: true })
export class Card {
  @Prop({ required: true })
  fullName: string;

  @Prop({ required: true, unique: true })
  cardNumber: string;

  @Prop({ required: true })
  expirationDate: string;

  @Prop({ required: true })
  userId: string;
}

export const CardSchema = SchemaFactory.createForClass(Card);
