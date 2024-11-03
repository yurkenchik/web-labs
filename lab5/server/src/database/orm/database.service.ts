import {Injectable} from "@nestjs/common";
import {DataSourceOptions} from "typeorm";
import {ConfigService} from "@nestjs/config";
import {join} from "path";
import {Car} from "../../car/car.entity";
import {TypeOrmOptionsFactory} from "@nestjs/typeorm";

@Injectable()
export class DatabaseService implements TypeOrmOptionsFactory {
    constructor(
        private readonly configService: ConfigService,
    ) {}

    createTypeOrmOptions(): DataSourceOptions {
        return {
            type: 'postgres',
            host: this.configService.get<string>('DB_HOST'),
            port: this.configService.get<number>('DB_PORT'),
            username: this.configService.get<string>('DB_USER'),
            password: this.configService.get<string>('DB_PASSWORD'),
            database: this.configService.get<string>('DB_NAME'),
            entities: [Car],
            synchronize: true,
            migrations: [join(__dirname, 'migrations/*.{js,ts}')],
            logging: true,
            ssl: {
                rejectUnauthorized: false,
            },
        };
    }

}