import {Injectable} from "@nestjs/common";
import {JwtService} from "@nestjs/jwt";
import {User} from "../../user/user.entity";
import {ConfigService} from "@nestjs/config";

@Injectable()
export class TokenService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
    ) {}

    async generateToken(userDataDto: Partial<User>): Promise<string> {
        const { id, firstName, lastName, email } = userDataDto;

        return this.jwtService.sign({id, firstName, lastName, email}, {
            secret: this.configService.get<string>('JWT_SECRET'),
            expiresIn: "3d"
        });
    }
}