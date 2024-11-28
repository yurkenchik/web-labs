import {HttpException, HttpStatus} from "@nestjs/common";

export class BucketItemNotFoundException extends HttpException {
    constructor() {
        super("Bucket item not found", HttpStatus.NOT_FOUND);
    }
}