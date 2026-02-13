import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  // Debug: cek env variables
  console.log('DATABASE_URL:', process.env.DATABASE_URL ? '✅ Loaded' : '❌ Not found');
  console.log('JWT_SECRET:', process.env.JWT_SECRET ? '✅ Loaded' : '❌ Not found');
  
  const app = await NestFactory.create(AppModule);
  
  app.enableCors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true,
  });
  
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true,
  }));
  
  app.setGlobalPrefix('api');
  
  await app.listen(4000);
  console.log('🚀 Server running on http://localhost:4000');
}
bootstrap();