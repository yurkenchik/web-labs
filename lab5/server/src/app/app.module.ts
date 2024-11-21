import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {ConfigModule, ConfigService} from "@nestjs/config";
import {CarModule} from "../car/car.module";
import {DatabaseService} from "../database/orm/database.service";
import {BucketModule} from "../bucket/bucket.module";

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useClass: DatabaseService,
        }),
        ConfigModule.forRoot({
            isGlobal: true
        }),
        CarModule,
        BucketModule,
    ],
    controllers: [AppController],
    providers: [AppService, DatabaseService],
})
export class AppModule {}
