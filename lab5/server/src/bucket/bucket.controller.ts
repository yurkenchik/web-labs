import {Body, Controller, Delete, Get, Param, Patch, Post, UseGuards} from "@nestjs/common";
import { BucketService } from "./bucket.service";
import { BucketItem } from "./bucket-item.entity";
import {AddGoodToBucketDto} from "./add-good-to-bucket.dto";
import { AuthGuard } from "src/common/guards/auth.guard";
import {UserId} from "../common/decorators/user-id.decorator";

@UseGuards(AuthGuard)
@Controller('bucket')
export class BucketController {
    constructor(private readonly bucketService: BucketService) {}

    @Post()
    async addGoodToBucket(@UserId() userId: string, @Body() addGoodToBucketDto: AddGoodToBucketDto): Promise<BucketItem> {
        return this.bucketService.addGoodToBucket(userId, addGoodToBucketDto);
    }

    @Get()
    async getBuckets(@UserId() userId: string): Promise<Array<BucketItem>> {
        return this.bucketService.getBucket(userId);
    }

    @Patch("/quantity-increase/:id")
    async increaseBucketItem(@Param("id") bucketItemId: string, @UserId() userId: string): Promise<BucketItem> {
        return this.bucketService.increaseBucketItemQuantity(bucketItemId, userId);
    }

    @Get(":id")
    async getBucketById(@Param("id") bucketItemId: string, @UserId() userId: string): Promise<BucketItem> {
        return this.bucketService.getBucketItem(bucketItemId, userId);
    }

    @Patch(":id")
    async removeGoodFromBucket(@Param("id") bucketItemId: string, @UserId() userId: string): Promise<BucketItem> {
        return this.bucketService.removeGoodFromBucket(bucketItemId, userId);
    }

    @Delete(":id")
    async deleteBucketItem(@Param("id") bucketItemId: string): Promise<void> {
        return this.bucketService.deleteBucketItem(bucketItemId);
    }
}