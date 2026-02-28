import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Enable CORS for the Next.js frontend
  app.enableCors({
    origin: '*', // For the assessment, this is fine. In production, restrict this.
  });

  // Enable global DTO validation
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // Strips out properties that don't have decorators
  }));

  await app.listen(4000);
}
bootstrap();