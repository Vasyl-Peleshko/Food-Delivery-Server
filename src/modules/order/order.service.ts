import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateOrderDto } from 'src/dtos/create-order.dto';
import { Order } from 'src/schemas/order.schema';
import { DeliverySimulator } from './delivery-simulator';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<Order>,
    private deliverySimulator: DeliverySimulator,
  ) {}

  async createOrder(
    createOrderDto: CreateOrderDto,
    userId: string,
  ): Promise<Order> {
    const newOrder = new this.orderModel({ ...createOrderDto, userId });
    return newOrder.save();
  }

  async getOrdersByUser(userId: string): Promise<Order[]> {
    return this.orderModel.find({ userId }).exec();
  }

  async assignCourier(
    orderId: string,
    restaurantAddress: string,
    deliveryAddress: string,
  ) {
    await this.deliverySimulator.startDelivery(
      orderId,
      restaurantAddress,
      deliveryAddress,
    );
  }
}
