import {CreateCarDto} from "../car/dto/create-car.dto";
import {Car} from "../car/car.entity";
import {UpdateCarDto} from "../car/dto/update-car.dto";
import {GetCarsFilterOptionsDto} from "../car/dto/get-cars-filter-options.dto";

export abstract class CarRepository {
    abstract createCar(createCarDto: CreateCarDto): Promise<Car>;
    abstract getCarById(carId: string): Promise<Car>;
    abstract getCars(getCarsFilterOptionsDto: GetCarsFilterOptionsDto): Promise<Array<Car>>;
    abstract updateCar(carId: string, updateCarDto: UpdateCarDto): Promise<Car>;
}