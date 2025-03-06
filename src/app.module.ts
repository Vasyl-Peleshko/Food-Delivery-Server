import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './config/database.module';
import { RestaurantModule } from './modules/restaurant/restaurant.module';
import { AuthenticationModule } from './modules/authentication/authentication.module';
import { FoodDetailsModule } from './modules/food-details/food-details.module';
import { NovaPoshtaModule } from './modules/nova-poshta/nova-poshta.module';
import { ConfigModule } from '@nestjs/config';
import { PaymentModule } from './modules/payment/payment.module';
import { OrderModule } from './modules/order/order.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    FoodDetailsModule,
    DatabaseModule,
    RestaurantModule,
    AuthenticationModule,
    NovaPoshtaModule,
    PaymentModule,
    OrderModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
