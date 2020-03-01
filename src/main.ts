import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as path from 'path';
import { ValidationPipe } from '@nestjs/common';
import * as cors from 'cors';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as bodyParser from 'body-parser';
import { useContainer } from 'class-validator';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true,
    validationError: {
      target: false,
    },
  })).useStaticAssets(path.join(__dirname, '/../public'));
  app.use(cors());
  app.use(bodyParser.json({ limit: '10mb' }));
  app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  const options = new DocumentBuilder().addBearerAuth().setTitle('ticker API').setDescription('').setVersion('1.0').build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document);

  await app.listen(3000);
}
bootstrap();
