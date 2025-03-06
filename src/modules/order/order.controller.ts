/* eslint-disable @typescript-eslint/no-unsafe-argument */
import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
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

    const { deliveryAddress, restaurantAddress } = createOrderDto;

    if (!deliveryAddress || !restaurantAddress) {
      throw new BadRequestException(
        'Delivery address and restaurant address are required.',
      );
    }

    const userAddress = `${deliveryAddress.city}, ${deliveryAddress.novaPostDepartment}`;

    const order = await this.orderService.createOrder(createOrderDto, userId);

    await this.orderService.assignCourier(
      order._id.toHexString(),
      restaurantAddress, // from frontend
      userAddress, // Combined city + Nova Poshta department from frontend
    );

    return order;
  }

  @Get()
  async getOrders(@Req() req) {
    return this.orderService.getOrdersByUser(req.user.sub);
  }
}
