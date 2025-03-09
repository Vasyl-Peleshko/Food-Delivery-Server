import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { Server as WebSocketServer } from 'ws';
import { createServer } from 'http';

async function bootstrap() {
  const logger = new Logger('Bootstrap');

  const httpServer = createServer();

  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:4200',
    methods: 'GET,POST,PUT,DELETE,PATCH',
    allowedHeaders: 'Content-Type, Authorization',
  });

  app.init().then(() => {
    httpServer.on('request', app.getHttpAdapter().getInstance());
  });

  const wss = new WebSocketServer({ server: httpServer, path: '/ws/orders' });

  wss.on('connection', (ws) => {
    logger.log('🔗 WebSocket client connected');

    ws.on('message', (message) => {
      logger.log(`📩 Received WebSocket message: ${message}`);
    });

    ws.on('close', () => {
      logger.log('❌ WebSocket client disconnected');
    });
  });

  global.WS_SERVER = wss;
  logger.log('✅ WebSocket server initialized');

  httpServer.listen(3000, () => {
    logger.log(
      '🚀 HTTP + WebSocket server is running on http://localhost:3000',
    );
  });
}

bootstrap();
