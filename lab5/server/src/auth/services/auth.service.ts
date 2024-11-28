import {Injectable} from "@nestjs/common";
import {UserService} from "../../user/user.service";
import {CreateUserDto} from "../../user/dto/create-user.dto";
import {AuthorizationResponseInterface} from "../../common/interfaces/authorization-response.interface";
import {TokenService} from "./token.service";

@Injectable()
export class AuthService {
    constructor(
        private readonly tokenService: TokenService,
        private readonly userService: UserService,
    ) {}

    async registration(registrationDto: CreateUserDto): Promise<AuthorizationResponseInterface> {
        const user = await this.userService.createUser(registrationDto);
        const token = await this.tokenService.generateToken(user);

        return { user, token };
    }
}