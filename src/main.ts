import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import { AppModule } from './app.module';
import * as compression from 'compression';

(async function bootstrap() {
  // Module Createion
  const app = await NestFactory.create(AppModule);

  // Helmet
  app.use(helmet());

  // Compression
  app.use(compression());

  // Swagger
  const config = new DocumentBuilder()
    .setTitle('Foundee API')
    .setDescription('The foundee API description')
    .setVersion('0.0.1')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  // Validations
  app.useGlobalPipes(new ValidationPipe());

  // Run
  await app.listen(process.env.PORT ?? 3000);
})();
