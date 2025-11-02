import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import helmet from 'helmet';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { GlobalExceptionFilter } from './common/filters/global-exception.filter';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';
import { GlobalValidationPipe } from './common/pipes/global-validation.pipe';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log', 'debug', 'verbose'],
  });

  // Security middleware
  app.use(helmet());

  // CORS configuration
  app.enableCors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
  });

  // Swagger documentation
  const config = new DocumentBuilder()
    .setTitle('XHubSell API')
    .setDescription('API documentation for XHubSell platform')
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('auth')
    .addTag('admin')
    .addTag('seller')
    .addTag('client')
    .addTag('public')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  // Global guards
  const reflector = app.get(Reflector);
  app.useGlobalGuards(new JwtAuthGuard(reflector));

  // Global validation pipe
  app.useGlobalPipes(GlobalValidationPipe);

  // Global exception filter
  app.useGlobalFilters(new GlobalExceptionFilter());

  // Response interceptor
  app.useGlobalInterceptors(new ResponseInterceptor());

  const port = process.env.PORT || 3001;
  await app.listen(port);

  console.log(`🚀 Application is running on: http://localhost:${port}`);
  console.log(`📊 Health check: http://localhost:${port}/health`);
  console.log(`🔧 Ready check: http://localhost:${port}/health/ready`);
  console.log(`📚 API Documentation: http://localhost:${port}/api/docs`);
}

bootstrap();
