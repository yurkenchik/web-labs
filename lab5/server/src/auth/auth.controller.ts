import {Body, Controller, Delete, Post, UseGuards} from "@nestjs/common";
import {AuthService} from "./services/auth.service";
import {CreateUserDto} from "../user/dto/create-user.dto";
import {AuthorizationResponseInterface} from "../common/interfaces/authorization-response.interface";
import {LoginDto} from "./dto/login.dto";
import {UserId} from "../common/decorators/user-id.decorator";
import {AuthGuard} from "../common/guards/auth.guard";

@Controller("auth")
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post("registration")
    async registration(@Body() registrationDto: CreateUserDto): Promise<AuthorizationResponseInterface> {
        return this.authService.registration(registrationDto);
    }

    @Post("login")
    async login(@Body() loginDto: LoginDto): Promise<AuthorizationResponseInterface> {
        return this.authService.login(loginDto);
    }

    @UseGuards(AuthGuard)
    @Delete("logout")
    async logout(@UserId() userId: string): Promise<void> {
        return this.authService.logout(userId);
    }
}