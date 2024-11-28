import { Injectable }  from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { BucketItem } from "./bucket-item.entity";
import { CarService } from "../car/car.service";
import { NotEnoughStockAvailableException } from "../common/exceptions/not-enough-stock-available.exception";
import { AddGoodToBucketDto } from "./add-good-to-bucket.dto";

@Injectable()
export class BucketService {
    constructor(
        @InjectRepository(BucketItem)
        private readonly bucketRepository: Repository<BucketItem>,
        private readonly carService: CarService,
    ) {}

    async addGoodToBucket(addGoodToBucketDto: AddGoodToBucketDto): Promise<BucketItem> {
        const { carId, quantity, year } = addGoodToBucketDto;

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
            });
        }

        await this.carService.updateCar(carId, car);
        await this.bucketRepository.save(bucketEntry);

        return bucketEntry;
    }

    async getBucketItem(bucketItemId: string): Promise<BucketItem> {
        const bucketItem = await this.bucketRepository
            .createQueryBuilder()
            .where("id = :bucketItemId", {bucketItemId})
            .getOne();

        if (!bucketItem) {
            throw new NotEnoughStockAvailableException();
        }
        return bucketItem;
    }

    async increaseBucketItemQuantity(bucketItemId: string): Promise<BucketItem> {
        const bucketItem = await this.getBucketItem(bucketItemId);

        bucketItem.quantity = bucketItem.quantity + 1;
        return this.bucketRepository.save(bucketItem);
    }

    async removeGoodFromBucket(bucketItemId: string): Promise<BucketItem> {
        const bucketItem = await this.getBucketItem(bucketItemId);

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

    async getBucket(): Promise<Array<BucketItem>> {
        return this.bucketRepository
            .createQueryBuilder("bucketItem")
            .leftJoinAndSelect("bucketItem.car", "*")
            .getMany();
    }
}