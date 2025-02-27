import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCardDto } from 'src/dtos/card.dto';
import { Card, CardDocument } from 'src/schemas/card.schema';

@Injectable()
export class PaymentService {
  constructor(@InjectModel(Card.name) private cardModel: Model<CardDocument>) {}

  async saveCard(userId: string, createCardDto: CreateCardDto): Promise<Card> {
    const existingCard = await this.cardModel.findOne({
      cardNumber: createCardDto.cardNumber,
      userId,
    });
    if (existingCard) {
      throw new BadRequestException('Card already exists for this user');
    }

    const newCard = new this.cardModel({ ...createCardDto, userId });
    return newCard.save();
  }

  async getCardsByUserId(userId: string): Promise<Card[]> {
    return this.cardModel.find({ userId }).exec();
  }

  async getCardById(userId: string, cardId: string): Promise<Card> {
    const card = await this.cardModel.findOne({ _id: cardId, userId }).exec();
    if (!card) {
      throw new NotFoundException('Card not found');
    }
    return card;
  }
}
