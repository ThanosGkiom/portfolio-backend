import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: true,
            transform: true,
        }),
    ).enableCors({
        origin: process.env.FRONTEND_URL,

        allowedHeaders: ['Content-Type', 'Accept'],

        methods: ['GET', 'POST', 'OPTIONS'],

        credentials: true,
    });

    await app.listen(3000);
}

void bootstrap();
