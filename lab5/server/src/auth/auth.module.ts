import {Module} from "@nestjs/common";
import {UserModule} from "../user/user.module";
import {JwtModule} from "@nestjs/jwt";
import {TokenService} from "./services/token.service";
import {AuthService} from "./services/auth.service";

@Module({
    providers: [TokenService, AuthService],
    controllers: [],
    imports: [
        UserModule,
        JwtModule
    ],
    exports: [AuthService],
})
export class AuthModule {}