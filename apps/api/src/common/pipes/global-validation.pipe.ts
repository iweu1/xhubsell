import { ValidationPipe } from '@nestjs/common';

export const GlobalValidationPipe = new ValidationPipe({
  whitelist: true,
  forbidNonWhitelisted: true,
  transform: true,
  transformOptions: {
    enableImplicitConversion: true,
  },
  exceptionFactory: (errors) => {
    const formattedErrors = errors.map(error => ({
      field: error.property,
      message: Object.values(error.constraints || {}).join(', '),
    }));
    
    return new Error(`Validation failed: ${JSON.stringify(formattedErrors)}`);
  },
});