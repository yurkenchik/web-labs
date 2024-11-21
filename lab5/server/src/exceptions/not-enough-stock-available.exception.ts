import {HttpException, HttpStatus} from "@nestjs/common";

export class NotEnoughStockAvailableException extends HttpException {
    constructor() {
        super("Not enough stock available", HttpStatus.BAD_REQUEST);
    }
}