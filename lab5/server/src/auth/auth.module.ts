import {Module} from "@nestjs/common";
import {UserModule} from "../user/user.module";
import {JwtModule} from "@nestjs/jwt";
import {TokenService} from "./services/token.service";
import {AuthService} from "./services/auth.service";
import {AuthController} from "./auth.controller";

@Module({
    providers: [TokenService, AuthService],
    controllers: [AuthController],
    imports: [
        UserModule,
        JwtModule
    ],
    exports: [AuthService],
})
export class AuthModule {}