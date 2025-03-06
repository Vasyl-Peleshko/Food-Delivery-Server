import {
  IsString,
  IsArray,
  IsNumber,
  ValidateNested,
  IsOptional,
} from 'class-validator';
import { Type } from 'class-transformer';

class AddonDto {
  @IsString()
  name: string;

  @IsNumber()
  price: number;

  @IsNumber()
  countable: boolean;
}

class ProductDto {
  @IsString()
  _id: string;

  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsNumber()
  price: number;

  @IsNumber()
  quantity: number;

  @IsString()
  imgUrl: string;

  @IsNumber()
  rating: number;

  @IsString()
  restaurantId: string;

  @IsArray()
  @IsString({ each: true })
  ingredients: string[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AddonDto)
  addons?: AddonDto[];
}

// Delivery address DTO
class DeliveryAddressDto {
  @IsString()
  city: string;

  @IsString()
  novaPostDepartment: string;
}

export class CreateOrderDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductDto)
  products: ProductDto[];

  @IsNumber()
  totalPrice: number;

  @IsOptional()
  @IsString()
  status?: string;

  // New fields
  @ValidateNested()
  @Type(() => DeliveryAddressDto)
  deliveryAddress: DeliveryAddressDto;

  @IsString()
  restaurantAddress: string;
}
