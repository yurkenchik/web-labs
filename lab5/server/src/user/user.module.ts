import {Module} from "@nestjs/common";
import {UserService} from "./user.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "./user.entity";
import {UserController} from "./user.controller";
import {JwtModule} from "@nestjs/jwt";

@Module({
    providers: [UserService],
    controllers: [UserController],
    imports: [
        TypeOrmModule.forFeature([User]),
        JwtModule
    ],
    exports: [UserService],
})
export class UserModule {}