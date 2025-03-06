/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from 'src/dtos/create-order.dto';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';

@Controller('order')
@UseGuards(JwtAuthGuard)
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async createOrder(@Body() createOrderDto: CreateOrderDto, @Req() req) {
    const userId = req.user.sub;
    return this.orderService.createOrder(createOrderDto, userId);
  }

  @Get()
  async getOrders(@Req() req) {
    return this.orderService.getOrdersByUser(req.user.sub);
  }
}
