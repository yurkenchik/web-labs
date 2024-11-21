import {Body, Controller, Delete, Get, Param, Patch, Post} from "@nestjs/common";
import { BucketService } from "./bucket.service";
import { BucketItem } from "./bucket-item.entity";
import {AddGoodToBucketDto} from "./add-good-to-bucket.dto";

@Controller('bucket')
export class BucketController {
    constructor(private readonly bucketService: BucketService) {}

    @Post()
    async addGoodToBucket(@Body() addGoodToBucketDto: AddGoodToBucketDto): Promise<BucketItem> {
        return this.bucketService.addGoodToBucket(addGoodToBucketDto);
    }

    @Get()
    async getBuckets(): Promise<Array<BucketItem>> {
        return this.bucketService.getBucket();
    }

    @Get(":id")
    async getBucketById(@Param("id") bucketItemId: string): Promise<BucketItem> {
        return this.bucketService.getBucketItem(bucketItemId);
    }

    @Patch(":id")
    async removeGoodFromBucket(@Param("id") bucketItemId: string): Promise<BucketItem> {
        return this.bucketService.removeGoodFromBucket(bucketItemId);
    }

    @Delete(":id")
    async deleteBucketItem(@Param("id") bucketItemId: string): Promise<void> {
        return this.bucketService.deleteBucketItem(bucketItemId);
    }
}