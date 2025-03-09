/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Injectable, Logger } from '@nestjs/common';
import { MapsService } from './maps.service';

@Injectable()
export class DeliverySimulator {
  private readonly logger = new Logger(DeliverySimulator.name);
  private activeDeliveries = new Map<string, { path: any[]; index: number }>();

  constructor(private mapsService: MapsService) {}

  async startDelivery(
    orderId: string,
    restaurantAddress: string,
    deliveryAddress: string,
  ) {
    this.logger.log(`🚀 Starting delivery for order ${orderId}`);

    const route = await this.mapsService.getRoute(
      restaurantAddress,
      deliveryAddress,
    );
    const path = route.steps.map((step: any) => step.end_location);

    this.activeDeliveries.set(orderId, { path, index: 0 });
    this.simulateMovement(orderId);
  }

  private async simulateMovement(orderId: string) {
    const delivery = this.activeDeliveries.get(orderId);
    if (!delivery) return;

    const interval = setInterval(() => {
      if (!global.WS_SERVER) {
        console.error(
          '❌ WebSocket server is not initialized, skipping update',
        );
        return;
      }

      if (delivery.index >= delivery.path.length) {
        this.logger.log(`✅ Order ${orderId} has been delivered.`);
        clearInterval(interval);

        global.WS_SERVER.clients.forEach((client) =>
          client.send(JSON.stringify({ orderId, status: 'delivered' })),
        );

        this.activeDeliveries.delete(orderId);
        return;
      }

      const nextLocation = delivery.path[delivery.index];
      global.WS_SERVER.clients.forEach((client) =>
        client.send(JSON.stringify({ orderId, location: nextLocation })),
      );

      delivery.index++;
    }, 5000);
  }
}
