import {Module} from "@nestjs/common";
import {CarService} from "./car.service";
import {CarController} from "./car.controller";
import {Car} from "./car.entity";
import {TypeOrmModule} from "@nestjs/typeorm";

@Module({
    providers: [CarService],
    controllers: [CarController],
    imports: [TypeOrmModule.forFeature([Car])],
    exports: [CarService],
})
export class CarModule {}