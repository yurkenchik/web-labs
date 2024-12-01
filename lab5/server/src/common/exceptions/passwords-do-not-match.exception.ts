import {HttpException, HttpStatus} from "@nestjs/common";

export class PasswordsDoNotMatchException extends HttpException {
    constructor() {
        super("Passwords do not match", HttpStatus.BAD_REQUEST);
    }
}