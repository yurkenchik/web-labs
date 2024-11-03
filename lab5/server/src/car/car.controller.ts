import {Body, Controller, Get, Param, Patch, Post, Query} from "@nestjs/common";
import {CarService} from "./car.service";
import {Car} from "./car.entity";
import {GetCarsFilterOptionsDto} from "./dto/get-cars-filter-options.dto";
import {CreateCarDto} from "./dto/create-car.dto";
import {UpdateCarDto} from "./dto/update-car.dto";

@Controller('cars')
export class CarController {
    constructor(
        private readonly carService: CarService
    ) {}

    @Get()
    async getCars(
        @Query() getCarsFilterOptions: GetCarsFilterOptionsDto
    ): Promise<Array<Car>> {
        return this.carService.getCars(getCarsFilterOptions);
    }

    @Get(":carId")
    async getCar(@Param("carId") carId: string): Promise<Car> {
        return this.carService.getCarById(carId);
    }

    @Post()
    async createCar(@Body() createCarDto: CreateCarDto): Promise<Car> {
        return this.carService.createCar(createCarDto);
    }

    @Patch(':carId')
    async updateCar(
        @Param("carId") carId: string,
        @Body() updateCarDto: UpdateCarDto
    ): Promise<Car> {
        return this.carService.updateCar(carId, updateCarDto);
    }
}