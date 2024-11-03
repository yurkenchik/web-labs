import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import {ConfigService} from "@nestjs/config";
import {ValidationPipe} from "@nestjs/common";

async function bootstrap() {
    const configService = new ConfigService();
    const PORT = configService.get<number>('PORT');
    const app = await NestFactory.create(AppModule);

    app.useGlobalPipes(new ValidationPipe());
    app.setGlobalPrefix("api");

    await app.listen(PORT, () => {
        console.log(`Server running on port: ${PORT}`);
    });
}
bootstrap();
