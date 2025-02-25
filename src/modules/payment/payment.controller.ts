import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CreateCardDto } from 'src/dtos/card.dto';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { Card } from 'src/schemas/card.schema';

@Controller('payment')
@UseGuards(JwtAuthGuard)
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}
  @Post()
  async saveCard(
    @Req() req,
    @Body() createCardDto: CreateCardDto,
  ): Promise<Card> {
    return this.paymentService.saveCard(req.user.sub, createCardDto);
  }

  @Get()
  async getUserCards(@Req() req): Promise<Card[]> {
    return this.paymentService.getCardsByUserId(req.user.sub);
  }

  @Get(':id')
  async getCardById(@Req() req, @Param('id') cardId: string): Promise<Card> {
    return this.paymentService.getCardById(req.user.sub, cardId);
  }
}
