import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BucketController } from "./bucket.controller";
import { BucketService } from "./bucket.service";
import { BucketItem } from "./bucket-item.entity";
import { CarModule } from "../car/car.module";

@Module({
    providers: [BucketService],
    controllers: [BucketController],
    imports: [
        TypeOrmModule.forFeature([BucketItem]),
        CarModule,
    ],
    exports: [BucketService],
})
export class BucketModule {}