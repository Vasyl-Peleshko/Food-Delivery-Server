import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  phoneNumber?: string;

  @Prop()
  age?: number;

  @Prop({
    type: {
      region: String,
      city: String,
      street: String,
      novaPostDepartment: String,
    },
  })
  deliveryAddress?: {
    region: string;
    city: string;
    street: string;
    novaPostDepartment: string;
  };
}

export const UserSchema = SchemaFactory.createForClass(User);
