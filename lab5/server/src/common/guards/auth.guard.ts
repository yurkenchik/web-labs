import {CanActivate, ExecutionContext, Injectable, UnauthorizedException} from "@nestjs/common";
import {Observable} from "rxjs";
import {JwtService} from "@nestjs/jwt";
import {ConfigService} from "@nestjs/config";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
    ) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();

        try {
            const [bearer, token] = request.headers.authorization.split(" ");
            console.log(token);

            if (!token || bearer !== "Bearer") {
                throw new UnauthorizedException();
            }

            const user = this.jwtService.verify(token, {
                secret: this.configService.get<string>("JWT_SECRET") || "secret",
            });

            request["user"] = user;
            return true;
        } catch (error) {
            throw new UnauthorizedException();
        }
    }
}