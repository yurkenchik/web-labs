import {Injectable, InternalServerErrorException} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Car} from "./car.entity";
import {Repository} from "typeorm";
import {CreateCarDto} from "./dto/create-car.dto";
import {GetCarsFilterOptionsDto} from "./dto/get-cars-filter-options.dto";
import {CarNotFoundException} from "../exceptions/car-not-found.exception";
import {UpdateCarDto} from "./dto/update-car.dto";
import {CarRepository} from "../repositories/car.repository";
import {CarAlreadyExistsException} from "../exceptions/car-already-exists.exception";

@Injectable()
export class CarService extends CarRepository {
    constructor(
        @InjectRepository(Car)
        private readonly carRepository: Repository<Car>,
    ) {
        super()
    }

    async createCar(createCarDto: CreateCarDto): Promise<Car> {
        try {
            const carInsertResult = await this.carRepository
                .createQueryBuilder()
                .insert()
                .into(Car)
                .values(createCarDto)
                .execute()

            return carInsertResult.raw[0];
        } catch(error) {
            if (error.code === "23505") {
                throw new CarAlreadyExistsException();
            }
            throw new InternalServerErrorException(error.message);
        }
    }

    async getCarById(carId: string): Promise<Car> {
        const car = await this.carRepository
            .createQueryBuilder()
            .where("id = :carId", { carId })
            .getOne();

        if (!car) {
            throw new CarNotFoundException();
        }
        return car;
    }

    async updateCar(carId: string, updateCarDto: UpdateCarDto): Promise<Car> {
        const updateResult = await this.carRepository
            .createQueryBuilder()
            .update()
            .set(updateCarDto)
            .where("id = :carId", { carId })
            .execute();

        return updateResult.raw;
    }

    async getCars(getCarsFilterOptionsDto: GetCarsFilterOptionsDto): Promise<Array<Car>> {
        let { searchTerm, sortOrder } = getCarsFilterOptionsDto;
        const queryBuilder  = this.carRepository.createQueryBuilder("car");

        if (searchTerm?.trim()) {
            searchTerm = searchTerm?.trim();
            queryBuilder.where("car.model LIKE :searchTerm", { searchTerm: `%${searchTerm}%` });
        }

        if (sortOrder) {
            queryBuilder.orderBy(`car.price`, sortOrder.toUpperCase() as "ASC" | "DESC");
        }
        return queryBuilder.getMany();
    }
}