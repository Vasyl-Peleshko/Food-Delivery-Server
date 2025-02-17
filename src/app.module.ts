import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './config/database.module';
import { RestaurantModule } from './modules/restaurant/restaurant.module';
import { AuthenticationModule } from './modules/authentication/authentication.module';
import { FoodDetailsModule } from './modules/food-details/food-details.module';

@Module({
  imports: [DatabaseModule, RestaurantModule, AuthenticationModule, FoodDetailsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
