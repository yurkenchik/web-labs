import {Injectable} from "@nestjs/common";
import {UserService} from "../../user/user.service";
import {CreateUserDto} from "../../user/dto/create-user.dto";
import {AuthorizationResponseInterface} from "../../common/interfaces/authorization-response.interface";
import {TokenService} from "./token.service";
import * as bcrypt from "bcrypt";
import {LoginDto} from "../dto/login.dto";
import {User} from "../../user/user.entity";
import {PasswordsDoNotMatchException} from "../../common/exceptions/passwords-do-not-match.exception";

@Injectable()
export class AuthService {
    constructor(
        private readonly tokenService: TokenService,
        private readonly userService: UserService,
    ) {}

    async registration(registrationDto: CreateUserDto): Promise<AuthorizationResponseInterface> {
        if (registrationDto.password !== registrationDto.confirmPassword) {
            throw new PasswordsDoNotMatchException();
        }

        const hashedPassword = await bcrypt.hash(registrationDto.password, 6);
        const user = await this.userService.createUser({
            ...registrationDto,
            password: hashedPassword,
        });

        const token = await this.tokenService.generateToken(user);

        return { user, token };
    }

    async login(loginDto: LoginDto): Promise<AuthorizationResponseInterface> {
        const validatedUser = await this.validateUser(loginDto);
        const token = await this.tokenService.generateToken(validatedUser);

        return {
            user: validatedUser,
            token,
        };
    }

    private async validateUser(loginDto: LoginDto): Promise<User> {
        const user = await this.userService.getUserByEmail(loginDto.email);

        const comparePassword = await bcrypt.compare(loginDto.password, user.password);
        if (user && comparePassword) {
            return user;
        }

        throw new PasswordsDoNotMatchException();
    }

    async logout(userId: string): Promise<void> {
        return this.userService.deleteUser(userId);
    }
}