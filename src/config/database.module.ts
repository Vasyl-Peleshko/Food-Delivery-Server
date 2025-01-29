import { Module, Logger } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        try {
          const uri = configService.get<string>('MONGO_URI');
          if (!uri) {
            throw new Error('MONGO_URI не знайдено в конфігурації');
          }
          await MongooseModule.forRoot(uri);
          const logger = new Logger('DatabaseModule');
          logger.log('MongoDB підключено успішно');
          return { uri };
        } catch (error) {
          const logger = new Logger('DatabaseModule');
          logger.error('Помилка підключення до MongoDB', error.stack);
          throw new Error('Не вдалося підключитися до MongoDB');
        }
      },
    }),
  ],
  exports: [MongooseModule],
})
export class DatabaseModule {}
