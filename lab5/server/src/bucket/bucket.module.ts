import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BucketController } from "./bucket.controller";
import { BucketService } from "./bucket.service";
import { BucketItem } from "./bucket-item.entity";
import { CarModule } from "../car/car.module";
import {UserModule} from "../user/user.module";
import {JwtModule} from "@nestjs/jwt";

@Module({
    providers: [BucketService],
    controllers: [BucketController],
    imports: [
        TypeOrmModule.forFeature([BucketItem]),
        CarModule,
        UserModule,
        JwtModule
    ],
    exports: [BucketService],
})
export class BucketModule {}