import {HttpException, HttpStatus} from "@nestjs/common";

export class CarAlreadyExistsException extends HttpException {
    constructor() {
        super("Car already exists", HttpStatus.BAD_REQUEST);
    }
}