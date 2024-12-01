import {Controller, Get, UseGuards} from "@nestjs/common";
import {UserService} from "./user.service";
import {UserId} from "../common/decorators/user-id.decorator";
import {AuthGuard} from "../common/guards/auth.guard";

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @UseGuards(AuthGuard)
    @Get("me")
    async getUserById(@UserId() userId: string) {
        return this.userService.getUserById(userId);
    }
}