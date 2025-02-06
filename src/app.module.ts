import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './config/database.module';
import { RestaurantModule } from './modules/restaurant/restaurant.module';
import { AuthenticationModule } from './modules/authentication/authentication.module';

@Module({
  imports: [DatabaseModule, RestaurantModule, AuthenticationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
