import { Injectable }  from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { BucketItem } from "./bucket-item.entity";
import { CarService } from "../car/car.service";
import { NotEnoughStockAvailableException } from "../common/exceptions/not-enough-stock-available.exception";
import { AddGoodToBucketDto } from "./add-good-to-bucket.dto";
import {UserService} from "../user/user.service";

@Injectable()
export class BucketService {
    constructor(
        @InjectRepository(BucketItem)
        private readonly bucketRepository: Repository<BucketItem>,
        private readonly carService: CarService,
        private readonly userService: UserService,
    ) {}

    async addGoodToBucket(userId: string, addGoodToBucketDto: AddGoodToBucketDto): Promise<BucketItem> {
        const { carId, quantity, year } = addGoodToBucketDto;

        const user = await this.userService.getUserById(userId);
        const car = await this.carService.getCarById(carId);
        if (car.quantity < quantity) {
            throw new NotEnoughStockAvailableException();
        }

        let bucketEntry = await this.bucketRepository
            .createQueryBuilder("bucketItem")
            .select()
            .where("bucketItem.car.id = :carId", { carId })
            .andWhere("bucketItem.year = :year", { year })
            .getOne();

        if (bucketEntry) {
            const totalQuantity = bucketEntry.quantity + quantity;
            if (totalQuantity > car.quantity) {
                throw new NotEnoughStockAvailableException();
            }
            bucketEntry.quantity = totalQuantity;
        } else {
            bucketEntry = this.bucketRepository.create({
                car,
                quantity,
                year,
                user
            });
        }

        await this.carService.updateCar(carId, car);
        await this.bucketRepository.save(bucketEntry);

        return bucketEntry;
    }

    async getBucketItem(bucketItemId: string, userId: string): Promise<BucketItem> {
        const bucketItem = await this.bucketRepository
            .createQueryBuilder()
            .where("id = :bucketItemId", { bucketItemId })
            .andWhere("user.id = :userId", { userId })
            .getOne();

        if (!bucketItem) {
            throw new NotEnoughStockAvailableException();
        }
        return bucketItem;
    }

    async increaseBucketItemQuantity(userId: string, bucketItemId: string): Promise<BucketItem> {
        const bucketItem = await this.getBucketItem(bucketItemId, userId);

        bucketItem.quantity = bucketItem.quantity + 1;
        return this.bucketRepository.save(bucketItem);
    }

    async removeGoodFromBucket(bucketItemId: string, userId: string): Promise<BucketItem> {
        const bucketItem = await this.getBucketItem(bucketItemId, userId);

        if (bucketItem.quantity > 1) {
            bucketItem.quantity -= 1;
            return await this.bucketRepository.save(bucketItem);
        } else {
            await this.deleteBucketItem(bucketItemId);
        }
    }

    async deleteBucketItem(bucketItemId: string): Promise<void> {
        await this.bucketRepository
            .createQueryBuilder()
            .delete()
            .from(BucketItem)
            .where("id = :bucketItemId", { bucketItemId })
            .execute();
    }

    async getBucket(userId: string): Promise<Array<BucketItem>> {
        const user = await this.userService.getUserById(userId);

        return this.bucketRepository
            .createQueryBuilder("bucketItem")
            .leftJoinAndSelect("bucketItem.car", "*")
            .where("bucketItem.user.id = :userId", { userId: user.id })
            .getMany();
    }
}