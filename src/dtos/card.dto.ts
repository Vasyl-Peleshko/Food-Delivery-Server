import { IsNotEmpty, IsString, Length, Matches } from 'class-validator';

export class CreateCardDto {
  @IsNotEmpty()
  @IsString()
  fullName: string;

  @IsNotEmpty()
  @IsString()
  @Length(16, 16, { message: 'Card number must be 16 digits' })
  @Matches(/^\d+$/, { message: 'Card number must contain only numbers' })
  cardNumber: string;

  @IsNotEmpty()
  @IsString()
  @Matches(/^(0[1-9]|1[0-2])\/\d{2}$/, {
    message: 'Expiration date must be in MM/YY format',
  })
  expirationDate: string;
}
